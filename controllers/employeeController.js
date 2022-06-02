const Employee = require("./../models/employeeSchema");
exports.getBySeniority = async (req, res) => {
  console.log(req.body);
  try {
    const bySeniority = await Employee.aggregate([
      {
        $sort: { DOJ: 1 },
      },
      {
        $project: {
          name: 1,
          designation: 1,
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: bySeniority,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      reason: error.message,
    });
  }
};
// TODO:GET SR. DATA BY TIME PERIOD
exports.getSrAndUpdateDes = async (req, res) => {
  req.body.stTime = req.body.stTime.split("-");
  req.body.endTime = req.body.endTime.split("-");
  let newPos = req.body.newDesignation;
  let start = new Date();
  let end = new Date();
  start.setFullYear(
    parseInt(req.body.stTime[2]),
    parseInt(req.body.stTime[1]) - 1,
    parseInt(req.body.stTime[0])
  );
  end.setFullYear(
    parseInt(req.body.endTime[2]),
    parseInt(req.body.endTime[1]) - 1,
    parseInt(req.body.endTime[0])
  );
  // start.setDate()
  // start.setMonth()
  try {
    let modData = [];
    let getData = await Employee.where("DOJ").gte(start).lte(end);
    for (let i of getData) {
      console.log(i.designation.split(" ")[0]);
      if (i.designation.split(" ")[0].trim() === "Sr.") {
        console.log(i);
        i.designation = newPos;
        await i.save();
        modData.push(i);
      }
    }
    res.status(200).json({
      status: "success",
      data: modData,
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      reason: error.message,
    });
  }
};
exports.getAllEmployees = async (req, res) => {
  console.log(req.body);
  try {
    const AllEmployees = await Employee.find();
    // AllEmployees.forEach((el) => {
    //   el.DOJ = el.DOJ.toJSON().slice(0, 10).split("-").reverse().join("-");
    //   if (el.DOR) {
    //     el.DOR = el.DOR.toJSON().slice(0, 10).split("-").reverse().join("-");
    //   }
    // });
    res.status(200).json({
      status: "success",
      data: AllEmployees,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      reason: error.message,
    });
  }
};
exports.getCount = async (req, res) => {
  console.log(req.body);
  try {
    const count = await Employee.count();
    res.status(200).json({
      status: "success",
      result: count,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      reason: error.message,
    });
  }
};
exports.promoteSeniors = async (req, res) => {
  console.log(req.body);

  try {
    const seniors = await Employee.find({ designation: /Sr+/ });
    console.log(seniors);
    for (var i of seniors) {
      i.designation = "P Manager";
      await i.save();
    }
    res.status(200).json({
      status: "success",
      data: seniors,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      reason: error.message,
    });
  }
};
exports.deleteEmployee = async (req, res) => {
  console.log(req.body);
  try {
    let newUser = await Employee.deleteOne({ id: req.body.id });
    console.log(newUser);
    res.status(200).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      data: error.message,
    });
  }
};
exports.addEmployee = async (req, res) => {
  console.log(req.body);
  req.body.DOJ = req.body.DOJ.split("-");
  let dat = new Date();
  console.log(req.body.DOJ);
  dat.setFullYear(
    parseInt(req.body.DOJ[2]),
    parseInt(req.body.DOJ[1]) - 1,
    parseInt(req.body.DOJ[0])
  );
  req.body.DOJ = dat;
  if (req.body.DOR) {
    req.body.DOR = req.body.DOR.split("-");
    let dat1 = new Date();
    dat1.setFullYear(
      parseInt(req.body.DOR[2]),
      parseInt(req.body.DOR[1]) - 1,
      parseInt(req.body.DOR[0])
    );
    req.body.DOR = dat1;
  }
  console.log(req.body.DOJ);
  try {
    let newUser = await Employee.create(req.body);
    console.log(newUser);
    res.status(200).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      data: error.message,
    });
  }
};
exports.updateAddressEmployee = async (req, res) => {
  console.log(req.body);
  try {
    let newUser = await Employee.findOneAndUpdate({ id: req.body.id });
    newUser.address = req.body.address;
    await newUser.save();
    console.log(newUser);
    res.status(200).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      data: error.message,
    });
  }
};
exports.maintainTable = async (req, res) => {
  console.log(req.body);
  const d = new Date();
  //   let year = d.getFullYear();
  //   d.setFullYear(year + 1);
  console.log(d);
  try {
    // let goneEmp = await Employee.deleteMany().where("DOR").ne(null).gte(d);
    let deleted = [];
    let goneEmp = await Employee.find();
    for (let i of goneEmp) {
      if (i.DOR) {
        console.log(i.DOR);
        let dat1 = new Date(i.DOR);
        dat1.setFullYear(i.DOR.getFullYear() + 1);
        console.log(i.DOR.getFullYear(), i.DOR.getMonth(), i.DOR.getDate());
        console.log(dat1.getFullYear(), dat1.getMonth(), dat1.getDate());
        console.log(dat1 + "\n" + i.DOR);
        if (dat1 > i.DOR) {
          deleted.push(i);
          i.remove();
        }
      }
    }
    res.status(200).json({
      status: "success",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      data: error.message,
    });
  }
};

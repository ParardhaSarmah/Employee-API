const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema(
  {
    id: { type: String, trim: true, required: true, unique: true }, //minlength:},
    name: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    designation: { type: String, trim: true, required: true },
    DOJ: {
      type: Date,
      required: true,
      default: () => Date.now(),
      // default: new Date().toJSON().slice(0, 10).split("-").reverse().join("-"),
    },
    DOR: { type: Date, default: null },
  },
  { collection: "employees" }
);
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;

// import doctorModel from "../models/doctorModel.js";



// const changeAvailablity = async(req,res)=>{
//     try {
        
//         const {docId} = req.body
//         const docData = await doctorModel.findById(docId)
//         await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
//         res.json({success:true,message:"Availability Changed"})

        
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// }
// const doctorList = async ()=>{
//     try {
        
//         const doctors = await doctorModel.find({}).select(['-password','-email'])

//         res.json({success:true,doctors})

//     } catch (error) {
//          console.error(error);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// }
// export {changeAvailablity,doctorList}

import doctorModel from "../models/doctorModel.js";

// Toggle doctor availability
const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });

    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all doctors
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { changeAvailablity, doctorList };

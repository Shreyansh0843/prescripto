import doctorModel from "../models/doctorModel.js";

const changeAvailabilty = async (req, res) => {
    try {
        const { docId } = req.body;

        if (!docId) {
            return res.json({ success: false, message: "docId is required" });
        }

        const doctor = await doctorModel.findById(docId);

        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        // Toggle availability
        const newAvailability = !doctor.available;

        await doctorModel.findByIdAndUpdate(docId, { available: newAvailability });

        return res.json({ success: true, message: "Availability changed" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

const doctorList = async (req,res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true, doctors})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export { changeAvailabilty, doctorList };

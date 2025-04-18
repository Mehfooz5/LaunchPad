import { Startup } from '../models/Startup.js';
import { Founder } from '../models/Founder.js';
import cloudinary from '../utils/cloudinary.js'; // Import Cloudinary configuration

// @desc Create startup profile
// @route POST /api/startup
export const createStartupProfile = async (req, res) => {
  const { title, domain, stage, location, description } = req.body;

  // Handle PDF file upload (if any)
  const startupPdf = req.file ? req.file.path : null;

  // Handle pitch video upload to Cloudinary
  let pitchUrl = null;
  if (req.files && req.files.pitch) {
    try {
      // Upload pitch video to Cloudinary
      const result = await cloudinary.uploader.upload(req.files.pitch[0].path, {
        resource_type: 'video', // Specify that it's a video file
      });
      pitchUrl = result.secure_url; // Store the secure URL from Cloudinary
    } catch (error) {
      return res.status(500).json({ message: 'Error uploading pitch video to Cloudinary', error: error.message });
    }
  }

  try {
    // Ensure that the user is associated with a founder profile
    const founder = await Founder.findOne({ userId: req.user._id });
    if (!founder) {
      return res.status(404).json({ message: 'Founder profile not found' });
    }

    // Create new startup profile
    const startup = new Startup({
      founderId: founder._id,
      title,
      domain,
      stage,
      location,
      description,
      startupPdf, // Store the PDF file path (or Cloudinary URL if uploaded there)
      pitch: pitchUrl, // Store the Cloudinary URL for pitch video
    });

    await startup.save();

    return res.status(201).json({
      message: 'Startup profile created successfully',
      startup
    });
  } catch (error) {
    console.error('Error in createStartupProfile:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



// @desc Get current startup profile
// @route GET /api/startup/me
export const getMyStartupProfile = async (req, res) => {
  try {
    const founder = await Founder.findOne({ userId: req.user._id });
    if (!founder) {
      return res.status(404).json({ message: 'Founder profile not found' });
    }

    const startup = await Startup.find({ founderId: founder._id }).populate('founderId', 'companyName bio');
    if (!startup) {
      return res.status(404).json({ message: 'Startup profile not found' });
    }

    return res.status(200).json(startup);
  } catch (error) {
    console.error('Error in getMyStartupProfile:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// @desc Update startup profile
// @route PUT /api/startup
export const updateStartupProfile = async (req, res) => {
  const { title, domain, stage, location, description, startupPdf, pitch } = req.body;

  try {
    const founder = await Founder.findOne({ userId: req.user._id });
    if (!founder) {
      return res.status(404).json({ message: 'Founder profile not found' });
    }

    const startup = await Startup.findOne({ founderId: founder._id });
    if (!startup) {
      return res.status(404).json({ message: 'Startup profile not found' });
    }

    startup.title = title || startup.title;
    startup.domain = domain || startup.domain;
    startup.stage = stage || startup.stage;
    startup.location = location || startup.location;
    startup.description = description || startup.description;
    startup.startupPdf = startupPdf || startup.startupPdf;
    startup.pitch = pitch || startup.pitch;

    await startup.save();

    return res.status(200).json({
      message: 'Startup profile updated successfully',
      startup
    });
  } catch (error) {
    console.error('Error in updateStartupProfile:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// @desc Get all startups
// @route GET /api/startups
export const getAllStartups = async (req, res) => {
  try {
    // const startups = await Startup.find().populate('founderId', 'companyName bio');
    const startups = await Startup.find()
    .populate('founderId', 'companyName bio')
    .populate({
    path: 'founderId',
    populate: {
      path: 'userId',
      select: 'fullName'
    }
    });

    return res.status(200).json(startups);
  } catch (error) {
    console.error('Error in getAllStartups:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// @desc Like a startup
// @route POST /api/startup/like/:id
export const likeStartup = async (req, res) => {
  const { id } = req.params;

  try {
    const startup = await Startup.findById(id);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    startup.likes += 1;
    await startup.save();

    return res.status(200).json({
      message: 'Startup liked successfully',
      likes: startup.likes
    });
  } catch (error) {
    console.error('Error in likeStartup:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// @desc Dislike a startup
// @route POST /api/startup/dislike/:id
export const dislikeStartup = async (req, res) => {
  const { id } = req.params;

  try {
    const startup = await Startup.findById(id);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    startup.dislikes += 1;
    await startup.save();

    return res.status(200).json({
      message: 'Startup disliked successfully',
      dislikes: startup.dislikes
    });
  } catch (error) {
    console.error('Error in dislikeStartup:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

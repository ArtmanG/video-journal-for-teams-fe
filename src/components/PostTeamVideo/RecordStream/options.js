//mediaRecorder video / audio capture restraints
const constraints = {
	//We want to capture audio,
	audio: true,
	//We want to capture video in this configuration
	video: {
		//Camera for mobile users
		facingMode: "user", //Front facing camera on mobile
		//min/ideal/max capture sizes
		width: { min: 640, ideal: 1280, max: 1920 },
		height: { min: 480, ideal: 720, max: 1080 },
		//Try for these framerates if possible
		frameRate: {
			ideal: 15,
			max: 20,
		},
	},
};

//mediaRecorder options config
const options = { mimeType: "video/webm;" };

export default {
	constraints,
	options,
};
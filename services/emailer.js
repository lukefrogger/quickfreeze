import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.NEXT_SENDGRID_KEY);

const sendEmail = async (to, templateId, customData) => {
	if (!to || !templateId) {
		console.log("no to or templateId");
		return false;
	}

	console.log("to", to);
	try {
		await sgMail.send({
			to,
			from: "support@quickfreeze.io",
			templateId,
			dynamic_template_data: customData,
		});
		return true;
	} catch (err) {
		console.log(err);
		console.log(err.response.body);
		return err;
	}
};

export default sendEmail;

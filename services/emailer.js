import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.NEXT_SENDGRID_KEY);

const sendEmail = async (to, templateId, customData) => {
	if (!to || !templateId) {
		console.log("no to or templateId");
		return false;
	}

	try {
		await sgMail.send({
			to,
			from: {
				email: "support@quickfreeze.io",
				name: "Quick Freeze Support",
			},
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

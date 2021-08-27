import sgMail from "@sendgrid/mail";
import { supabase } from "../../services/supabase";

export default async (req, res) => {
	console.log(req.body);
	sgMail.setApiKey(process.env.SENDGRID);

	if (req.body.middleName || !req.body.first || !req.body.last || !req.body.email) {
		return res.send("Form was no properly created");
	}

	try {
		//save to supabase
		let { data } = await supabase.from("early-signups").select(`id, firstname, lastname, email`).eq("email", req.body.email).single();

		if (!data) {
			let { error } = await supabase
				.from("early-signups")
				.insert([{ firstname: req.body.first, lastname: req.body.last, email: req.body.email }]);

			if (error) {
				throw error;
			}
		}

		const msg = {
			to: req.body.email,
			from: {
				email: "support@quickfreeze.io",
				name: "Quick Freeze",
			},
			templateId: "d-6c4144fafed041e78936316ea910c3f0",
			dynamic_template_data: {
				firstName: req.body.first,
			},
		};

		await sgMail.send(msg);
		res.send({ success: true });
	} catch (err) {
		console.log("===> Error", err);
		res.status(400).send({ success: false, error: err });
	}
};

import FullScreenLayout from "../components/FullScreenLayout";
import HorizontalHeader from "../components/HorizontalHeader";
// import { connectToDatabase } from "../lib/mongodb";
import icon from "../public/logo_big_trans.png";
import Image from "next/image";
import Button from "../atoms/Button";
import EmphasizedText from "../atoms/EmphasizedText";
import PixelWedge from "../atoms/PixelWedge";
import wedge from "../public/wedge.png";

export default function Home() {
	return (
		<FullScreenLayout>
			<HorizontalHeader />
			<div className="flex flex-col items-center">
				<Image src={icon} alt="quick freeze logo" height={250} width={250} />
				<div className="text-4xl max-w-screen-md text-center mt-6">
					An <EmphasizedText>API driven, temporary</EmphasizedText> database for short-term data
				</div>
				<div className="max-w-screen-md text-center mt-6">
					<div className="text-xl ">
						The fastest way to use a temorary data store for webhooks, server logs, data migrations, or anything else!
					</div>
					<div className="mt-6">
						<Button color="primary mr-4">Start a Project</Button>
						<Button type="outline" color="white">
							Documentation
						</Button>
					</div>
				</div>
			</div>
			<div className="absolute right-0 w-screen mt-4 bg-white">
				<div className="absolute -top-1">
					<Image src={wedge} />
				</div>

				<PixelWedge />
			</div>
		</FullScreenLayout>
	);
}

// export async function getStaticProps(context) {
// 	const { client } = await connectToDatabase();

// 	const isConnected = await client.isConnected();

// 	return {
// 		props: { isConnected },
// 	};
// }

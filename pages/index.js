import FullScreenLayout from "../components/FullScreenLayout";
import HorizontalHeader from "../components/HorizontalHeader";
// import { connectToDatabase } from "../lib/mongodb";
import icon from "../public/logo_big_trans.png";
import Image from "next/image";
import Button from "../atoms/Button";
import EmphasizedText from "../atoms/EmphasizedText";
import PixelWedge from "../atoms/PixelWedge";
import wedge from "../public/wedge.png";
import Container from "../atoms/container";

export default function Home() {
	return (
		<FullScreenLayout>
			<HorizontalHeader />
			<div>
				<Container>
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
				</Container>
				<div className="w-screen mt-4 bg-white relative">
					<Image src={wedge} className="z-10" />
					<div className="absolute top-4 z-0 w-screen">
						<PixelWedge />
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center bg-white py-8 text-bDark">
				<div className="text-3xl text-center mt-2 font-bold">Storing short term data shouldn’t be time consuming</div>
				<div className="max-w-screen-md text-center mt-2">
					Setting up a database for short term data is time consuming and expensive. Without{" "}
					<EmphasizedText>Quick Freeze</EmphasizedText> you’ll have to deal with...
				</div>
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

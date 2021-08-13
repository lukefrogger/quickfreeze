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
			<div className="flex flex-col items-center bg-white pt-8 pb-12 px-4 text-bDark">
				<div className="text-3xl text-center my-2 font-bold">Storing short term data shouldn’t be time consuming</div>
				<div className="max-w-screen-md text-center mt-2">
					Setting up a database for short term data is time consuming and expensive. Without{" "}
					<EmphasizedText>Quick Freeze</EmphasizedText> you’ll have to deal with...
				</div>
				<div className="flex lg:w-1/2 sm:w-full mt-8 ">
					<div className="w-1/2">
						<div className="border border-bDark rounded-tl border-b-0 border-r-0 p-2 flex items-center">
							<span className="mr-4">
								<svg className="h-8 w-8" viewBox="0 0 20 20" fill="#3D3D3D">
									<path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
									<path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
									<path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
								</svg>
							</span>
							Managing a schema
						</div>
						<div className="border border-bDark border-b-0 p-2 border-r-0 flex items-center">
							<span className="mr-4">
								<svg className="h-8 w-8" viewBox="0 0 20 20" color="blue">
									<path
										fillRule="evenodd"
										fill="#3D3D3D"
										d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
										clipRule="evenodd"
									/>
								</svg>
							</span>
							Database management
						</div>
						<div className="border border-bDark rounded-bl p-2 border-r-0 flex items-center">
							<span className="mr-4">
								<svg className="h-8 w-8" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										fill="#3D3D3D"
										d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
										clipRule="evenodd"
									/>
									<path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
								</svg>
							</span>
							Setup a local file system
						</div>
					</div>
					<div className="w-1/2">
						<div className="border border-bDark rounded-tr border-b-0 p-2 flex items-center">
							<span className="mr-4">
								<svg className="h-8 w-8" viewBox="0 0 20 20">
									<path d="M13 7H7v6h6V7z" />
									<path
										fillRule="evenodd"
										fill="#3D3D3D"
										d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
										clipRule="evenodd"
									/>
								</svg>
							</span>
							Store data in-memory
						</div>
						<div className="border border-bDark border-b-0 p-2 flex items-center">
							<span className="mr-4">
								<svg className="h-8 w-8" viewBox="0 0 20 20">
									<path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
									<path
										fillRule="evenodd"
										fill="#3D3D3D"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
										clipRule="evenodd"
									/>
								</svg>
							</span>
							Costly database hosting
						</div>
						<div className="border border-bDark rounded-br p-2 flex items-center">
							<span className="mr-4">
								<svg className="h-8 w-8" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										fill="#3D3D3D"
										d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</span>
							Writing code to delete old data
						</div>
					</div>
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

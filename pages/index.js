import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import HorizontalHeader from "@/components/framing/HorizontalHeader";
import icon from "../public/logo_big_trans.png";
import Image from "next/image";
import Button from "@/atoms/Button";
import EmphasizedText from "@/atoms/EmphasizedText";
// import PixelWedge from "@/atoms/PixelWedge";
import wedge from "../public/wedge_pixels.png";
import SmallHeader from "@/atoms/SmallHeader";
import { VertLabeledIcon } from "@/components/VertLabledIcon";
import Solutions from "@/atoms/Solutions";
import Step from "@/atoms/Step";
import PricingTable from "@/components/PricingTable";
import Link from "next/link";
import { useRouter } from "next/router";
import Container from "@/atoms/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faDatabase, faFileInvoiceDollar, faFolderOpen, faMicrochip, faTools } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
	const router = useRouter();

	const getStarted = (planId) => {
		console.log("get started with", planId);
		router.replace(`/sign-up?plan=${planId}`);
	};

	return (
		<FullScreenLayout>
			<HorizontalHeader />
			<section>
				<Container>
					<div className="flex flex-col items-center">
						<Image src={icon} alt="quick freeze logo" height={250} width={250} />
						<div className="text-4xl max-w-screen-md text-center mt-6">
							An <EmphasizedText>API driven </EmphasizedText> data-store for <EmphasizedText>temporary data</EmphasizedText>
						</div>
						<div className="max-w-screen-md text-center mt-6">
							<div className="text-xl ">
								The easiest way to store temporary data from webhooks, server logs, data migrations, or anything else!
							</div>
							<div className="mt-6">
								<Link href="/sign-up" passHref>
									<Button color="primary">Sign up now</Button>
								</Link>
								&nbsp;&nbsp;
								<Link href="/docs" passHref>
									<Button type="outline" color="white">
										Documentation
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</Container>
				<div className="w-full mt-4 bg-white relative">
					<Image src={wedge} alt="frozen pixels" className="z-10" layout="responsive" />
					{/* <div className="absolute top-1 lg:top-4 z-0 w-full">
						<PixelWedge />
					</div> */}
				</div>
			</section>
			<section className="bg-white text-bDark pb-12 px-4  -mt-px">
				<Container>
					<div className="flex flex-col items-center  ">
						<header>
							<div className="text-3xl text-center my-2 font-bold">Storing temporary data shouldn’t be time consuming</div>
							<div className="max-w-screen-md text-center mt-2">
								Setting up a database for temporary data is time consuming and expensive. Without{" "}
								<EmphasizedText>Quick Freeze</EmphasizedText> you’ll have to deal with these things:
							</div>
						</header>
						<div className="grid grid-cols-2 lg:w-1/2 sm:w-full mt-8 ">
							<div className="border border-bDark rounded-tl border-b-0 border-r-0 p-4 flex items-center">
								<span className="mr-4">
									<FontAwesomeIcon icon={faDatabase} size="2x" />
								</span>
								Managing a schema
							</div>
							<div className="border border-bDark rounded-tr border-b-0 p-4 flex items-center">
								<span className="mr-4">
									<FontAwesomeIcon icon={faTools} size="2x" />
								</span>
								Database management
							</div>
							<div className="border border-bDark p-4 border-r-0 border-b-0 flex items-center">
								<span className="mr-4">
									<FontAwesomeIcon icon={faFolderOpen} size="2x" />
								</span>
								Local file storage
							</div>
							<div className="border border-bDark border-b-0 p-4 flex items-center">
								<span className="mr-4">
									<FontAwesomeIcon icon={faMicrochip} size="2x" />
								</span>
								Store data in-memory
							</div>
							<div className="border border-bDark rounded-bl border-r-0 p-4 flex items-center">
								<span className="mr-4">
									<FontAwesomeIcon icon={faFileInvoiceDollar} size="2x" />
								</span>
								Costly database hosting
							</div>
							<div className="border border-bDark rounded-br p-4 flex items-center">
								<span className="mr-4">
									<FontAwesomeIcon icon={faCode} size="2x" />
								</span>
								Writing code to access data
							</div>
						</div>
					</div>
				</Container>
			</section>
			<section className="py-12 px-4">
				<Container>
					<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4  items-center ">
						<header>
							<SmallHeader>Made for developers</SmallHeader>
							<div className="text-3xl mb-4">
								A <EmphasizedText>storage API</EmphasizedText> so you can focus on development
							</div>
							<p>
								Let us remove the boilerplate, store and delete your temporary data so you can focus on building amazing
								products
							</p>
						</header>
						<div className="flex justify-around flex-col md:flex-row">
							<VertLabeledIcon
								color="primary"
								label="API Driven"
								icon={
									<svg className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
										<path
											fillRule="evenodd"
											d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
											clipRule="evenodd"
										/>
									</svg>
								}
							/>
							<VertLabeledIcon
								color="primary"
								label="Asynchronous"
								icon={
									<svg className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
											clipRule="evenodd"
										/>
									</svg>
								}
							/>
							<VertLabeledIcon
								color="primary"
								label="Easy to Integrate"
								icon={
									<svg className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
										<path
											fillRule="evenodd"
											d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
											clipRule="evenodd"
										/>
									</svg>
								}
							/>
						</div>
					</div>
				</Container>
			</section>
			<section className="py-12 px-4 bg-white text-bDark relative">
				<Container>
					<header className="mb-8">
						<SmallHeader>Solutions</SmallHeader>
						<div className="text-3xl mb-4">
							How can <EmphasizedText>Quick Freeze</EmphasizedText> help you?
						</div>
						<p>
							Using the asynchronous nature of Quick Freeze, you can focus on creating the major parts of your application
							while setting up and storing the less-important data for later use. Whenever you're ready to use the data, a
							simple API call will return it to you!
						</p>
					</header>
					<div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
						<Solutions
							title="Server Logs"
							text="Quick Freeze can provide a bridge between your main database and a server application, saving you from
								spending time managing a local database or writing a direct integration."
						/>
						<Solutions
							title="Data Migration"
							text="Do you need somewhere to store data while migrating it from one application to another? Quick Freeze can provide the temporary storage you need."
						/>
						<Solutions
							title="Webhook Recieving"
							text="Using Quick Freeze to recieve data from webhooks is a quick and easy option. Once you’re ready, you can GET the data with a simple API call."
						/>
						<Solutions
							title="Batching Data Import/Export"
							text="A lot of platforms have API limits. Quick Freeze can help you batch transactions by temporarily holding your data until there is a sufficiently sized batch."
						/>
						<Solutions
							title="Job Queue Data"
							text="Quick Freeze can increase failover and help deployments by storing unfinished jobs in a queueing application."
						/>
					</div>
				</Container>
				<div className="absolute right-0 bottom-0">
					<svg width="145" height="117" viewBox="0 0 145 117">
						<rect x="115.5" y="87.5" width="28.986" height="28.8223" fill="#2D9CDB" stroke="#272727" />
						<rect x="86.5" y="87.5" width="28.986" height="28.8223" fill="#00B2FF" stroke="#272727" />
						<rect x="115.5" y="58.5" width="28.986" height="28.8223" fill="#00B2FF" stroke="#272727" />
						<rect x="115.5" y="29.5" width="28.986" height="28.8223" fill="#2D9CDB" stroke="#272727" />
						<rect x="58.5" y="87.5" width="28.986" height="28.8223" fill="#2D9CDB" stroke="#272727" />
						<rect x="86.5" y="58.5" width="28.986" height="28.8223" fill="#00B2FF" stroke="#272727" />
						<rect x="58.5" y="58.5" width="28.986" height="28.8223" fill="#00B2FF" stroke="#272727" />
						<rect x="87.5" y="29.5" width="28" height="29" fill="#2D9CDB" stroke="#272727" />
						<rect x="115.5" y="0.5" width="28.986" height="28.8223" fill="#00B2FF" stroke="#272727" />
						<rect x="29.5" y="58.5" width="28.986" height="28.8223" fill="#2D9CDB" stroke="#272727" />
						<rect x="0.5" y="87.5" width="28.986" height="28.8223" fill="#00B2FF" stroke="#272727" />
					</svg>
				</div>
			</section>
			<section className="py-12 px-4 relative">
				<Container>
					<header>
						<SmallHeader>Quick Start</SmallHeader>
						<div className="text-3xl mb-4">
							How to get started with <EmphasizedText>Quick Freeze</EmphasizedText>
						</div>
					</header>
					<div>
						<Step number="1">
							<p>
								Create a tray. To create a tray you’ll need to give it a name and optionally customize the endpoint. You’ll
								also select the <EmphasizedText weight="normal">Freeze option</EmphasizedText>, which defines what happens
								when your data is read.
							</p>
							<div className="text-primary mt-2">Freeze Options</div>
							<ul>
								<li>
									<em>Quick Freeze:</em> Once data is read from a tray, it is automatically deleted
								</li>
								<li>
									<em>Deep Freeze:</em> Data can be read from a tray as many times as needed
								</li>
							</ul>
						</Step>
						<Step number="2">
							Post data into your tray using it’s endpoint and one of your tokens. The data will be stringified and stored -
							it won’t be manipulated or read, but its bytes will be calculated for billing purposes.
						</Step>
						<Step number="3">
							Fetch the data out of Quick Freeze with a simple API call. Depending on your{" "}
							<EmphasizedText weight="normal">Freeze option</EmphasizedText>, the data will then be deleted or continue to
							persist.
						</Step>
					</div>
				</Container>
			</section>
			<section className="py-12 px-4 bg-white text-bDark relative">
				<Container>
					<header>
						<SmallHeader>Pricing</SmallHeader>
						<div className="text-3xl mb-4">Simple and straightforward pricing</div>
					</header>
					<div>
						<PricingTable setSelected={getStarted} />
					</div>
				</Container>
			</section>
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

import Link from "next/link";
import Container from "@/atoms/Container";
import EmphasizedText from "@/atoms/EmphasizedText";
import SmallHeader from "@/atoms/SmallHeader";
import CodeSnippet from "@/components/CodeSnippet";
import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import HorizontalHeader from "@/components/framing/HorizontalHeader";

export default function Documentation() {
	return (
		<FullScreenLayout>
			<HorizontalHeader />
			<section className="pt-4">
				<Container padding="px-4">
					<header className="mb-8">
						<SmallHeader>Documentation</SmallHeader>
						<div className="text-3xl mb-4">Using the Quick Freeze API</div>
					</header>
				</Container>
			</section>
			<section>
				<Container padding="px-4 border-b pb-8">
					<div className="text-2xl text-bold mb-4 mt-8">Adding records to a tray</div>
					<div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
						<div>
							<div className="">
								1.{" "}
								<Link href="/sign-up">
									<a targe="_blank" className="text-primary underline">
										Create an Account
									</a>
								</Link>
							</div>
							<div>
								2.{" "}
								<Link href="/app/tray/new">
									<a targe="_blank" className="text-primary underline">
										Create a tray
									</a>
								</Link>{" "}
								through the dashboard
								<div className="ml-4">
									<div>
										- Each tray requires an endpoint that is unique to your account. Once a tray is created the endpoint
										cannot be changed.
									</div>
									<div>
										- Set the <span className="text-primary">Freeze Option</span>
										<div className="ml-8">
											<strong>Quick Freeze:</strong> Once data a read from a tray, it is automatically deleted
										</div>
										<div className="ml-8">
											<strong>Deep Freeze:</strong> Requires a paid plan - data can be read from a tray as many times
											as needed
										</div>
									</div>
								</div>
							</div>
							<div>
								3. Use your{" "}
								<Link href="/app/account">
									<a targe="_blank" className="text-primary underline">
										account token
									</a>
								</Link>{" "}
								and tray endpoint to make a POST request with the record you’d like to freeze as the body of the request.
								Quick Freeze will turn it into an “ice cube” and store it.
							</div>
						</div>
						<div>
							<CodeSnippet
								title="Adding a record to a tray"
								code={`const trayEndpoint = '{{tray_endpoint}}';
const data = {...record};

const response = await fetch(trayEndpoint, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer {{account_token}}'
	},
	body: JSON.stringify(data)
});`}
							/>
						</div>
					</div>
				</Container>
			</section>
			<section className="mt-8">
				<Container padding="px-4 border-b pb-8">
					<div className="text-2xl text-bold mb-4">Retrieve records from a tray</div>
					<div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
						<div>
							1. Use an{" "}
							<Link href="/app/account">
								<a targe="_blank" className="text-primary underline">
									account token
								</a>
							</Link>{" "}
							and a tray{`'`}s endpoint to construct a GET request.
							<div className="ml-4">
								<div>
									- There are not {`"where"`} clauses in Quick Freeze. Executing a GET request will retrieve all the
									records in a tray.
								</div>
							</div>
							<div>
								2. Make sure you understand the <EmphasizedText weight="normal">Freeze Option</EmphasizedText> for the tray
							</div>
							<div>
								3. Add a Custom Setting to the body of the request if needed
								<div>
									<div className="ml-8">
										<strong>deleteOnComplete:</strong> Use with Deep Freeze - this will delete the data once it is
										retrieved. If never used, data will remain in the tray until it reaches it's data retention setting
									</div>
								</div>
							</div>
						</div>

						<div>
							<CodeSnippet
								title="Retrieve records from a tray"
								code={`const trayEndpoint = '{{tray_endpoint}}';

const customSettings = {
    // Use with Deep Freeze to delete fetched data.
    deleteOnComplete: true
}

const response = await fetch(trayEndpoint, {
    headers: {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer {{account_token}}'
    },
	// body is only required when using custom settings
	body: JSON.stringify(customSettings)
  });
}`}
							/>
						</div>
					</div>
				</Container>
			</section>
			<section className="mt-8 mb-12">
				<Container padding="px-4">
					<div className="text-2xl text-bold my-4">Quick Freeze vs Deep Freeze: Storage options</div>
					<p>
						Depending on your subscription, when creating a tray you’ll have the option to select Deep Freeze or Quick Freeze.
						These two options control what happens to your data once it is successfully retrieved.
					</p>
					<div className="grid md:grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-8 mt-8">
						<div className="mt-4">
							<div className="text-lg font-bold">Quick Freeze</div>
							<p>- Once data a read from a tray, it is automatically deleted</p>
						</div>
						<CodeSnippet
							title="Retrieve data from a quick freeze tray"
							code={`const url = 'https://quickfreeze.io/api/ice_cubes/';
const trayEndpoint = '{{tray_endpoint}}';

const response = await fetch(url+trayEndpoint, {
    headers: {
	  'Content-Type': 'application/json',
      'Authorization': 'Bearer {{account_token}}'
    }
  });
}`}
						/>
						<div className="mt-4">
							<div className="text-lg font-bold">Deep Freeze</div>
							<p>- Requires a paid plan: data can be read from a tray as many times as needed</p>
							<p>
								- Deep Freeze data can be retrieved up to its data retention date. If you would like to delete the data
								before its expiration date, you can include an optional parameter in your request
							</p>
						</div>
						<CodeSnippet
							title="Retrieve and delete data in a deep freeze tray"
							code={`const trayEndpoint = '{{tray_endpoint}}';

const response = await fetch(trayEndpoint, {
    headers: {
	  'Content-Type': 'application/json',
      'Authorization': 'Bearer {{account_token}}'
    },
	// will delete the data in a Deep Freeze tray
	body: JSON.stringify({deleteOnComplete: true})
  });
}`}
						/>
					</div>
				</Container>
			</section>
		</FullScreenLayout>
	);
}

import Link from "next/link";
import Container from "../atoms/container";
import EmphasizedText from "../atoms/EmphasizedText";
import { SmallHeader } from "../atoms/smallHeader";
import CodeSnippet from "../components/CodeSnippet";
import FullScreenLayout from "../components/FullScreenLayout";
import HorizontalHeader from "../components/HorizontalHeader";
import Message from "../components/Message";

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
					<div className="my-6">
						<Message>
							<strong>Quick Freeze is still under development.</strong> To stay up to date, sign up and we'll keep you updated
							with newest details.
						</Message>
					</div>
				</Container>
			</section>
			<section>
				<Container padding="px-4 border-b pb-8">
					<div className="text-2xl text-bold mb-4 mt-8">Adding records to a bucket</div>
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
								{/* <Link href="/app/buckets">
									<a targe="_blank" className="text-primary underline"> */}
								Create a bucket
								{/* </a>
								</Link>*/}{" "}
								through the dashboard
								<div className="ml-4">
									<div>
										- Buckets require an endpoint that is unique to your account. Once a bucket is created the endpoint
										cannot be changed.
									</div>
									<div>
										- Set the Freeze Option
										<div className="ml-8">
											<strong>Quick Freeze:</strong> Once data a read from a bucket, it is automatically deleted
										</div>
										<div className="ml-8">
											<strong>Deep Freeze:</strong> (requires a paid plan) Data can be stored for as long as needed
											and read from a bucket as many times as needed
										</div>
									</div>
								</div>
							</div>
							<div>
								3. Use your{" "}
								{/* <Link href="/app/account/tokens">
									<a targe="_blank" className="text-primary underline"> */}
								account token
								{/* </a>
								</Link> */}{" "}
								and bucket endpoint to make a POST request with the record you’d like to freeze as the body of the request.
								Quick Freeze will turn it into an “ice cubes” and store it.
							</div>
						</div>
						<div>
							<CodeSnippet
								code={`const url = 'https://quickfreeze.io/api/bucket/';
const bucketEndpoint = '{{bucket_endpoint}}';
const data = {...record};

const response = await fetch(url+bucketEndpoint+'/iceCubes', {
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
					<div className="text-2xl text-bold mb-4">Retrieve records from a bucket</div>
					<div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
						<div>
							1. Use your{" "}
							{/* <Link href="/app/account/tokens">
								<a targe="_blank" className="text-primary underline"> */}
							account token
							{/* </a>
							</Link> */}{" "}
							and a bucket's endpoint to construct a GET request.
							<div className="ml-4">
								<div>
									- There are not "where" clauses in Quick Freeze. Executing a GET request will retrieve all the records
									in a bucket.
								</div>
							</div>
							<div>
								2. Make sure you understand the <EmphasizedText weight="normal">Freeze Option</EmphasizedText> for the
								bucket
							</div>
							<div>
								3. Add a Custom Setting to the body of the request if needed
								<div>
									<div className="ml-8">
										<strong>deleteOnComplete:</strong> Use with Deep Freeze - this will delete the data once it's
										retrieved. If never used, data will remain in the bucket until it reaches it's expiration date
									</div>
									<div className="ml-8">
										<strong>preventDelete:</strong> Use with Quick Freeze to prevent deletion - your account must have
										access to Deep Freeze to set this.
									</div>
								</div>
							</div>
						</div>

						<div>
							<CodeSnippet
								title="[GET] Ice cubes"
								code={`const url = 'https://quickfreeze.io/api/bucket/';
const bucketEndpoint = '{{bucket_endpoint}}';

const customSettings = {
    // Use with Deep Freeze to remove data once retrieved
    deleteOnComplete: boolean,
    // Use with Quick Freeze to prevent deletion
    preventDelete: boolean 
}

const response = await fetch(url+bucketEndpoint+'/iceCubes', {
    headers: {
      'Authorization': 'Bearer {{web_token}}'
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
						Depending on your subscription, when creating a bucket you’ll have the option to select Deep Freeze or Quick Freeze.
						These two options control what happens to your data once it is successfully retrieved.
					</p>
					<div className="grid md:grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-8 mt-8">
						<div className="mt-4">
							<div className="text-lg font-bold">Quick Freeze</div>
							<p>- Once data a read from a bucket, it is automatically deleted</p>
							<p>
								- If you have access to Deep Freeze (requires a paid subscription) you may include an optional parameter to
								prevent your data from automatically deleting.
							</p>
						</div>
						<CodeSnippet
							title="Prevent deletion in a quick freeze bucket"
							code={`const url = 'https://quickfreeze.io/api/bucket';
const bucketEndpoint = '/funkyBucket';

const response = await fetch(url+bucketEndpoint+'/iceCubes', {
    headers: {
      'Authorization': 'Bearer {{web_token}}'
    },
	// prevents the auto-deleting of the buckets data
	body: JSON.stringify({preventDelete: true})
  });
}`}
						/>
						<div className="mt-4">
							<div className="text-lg font-bold">Deep Freeze</div>
							<p>
								- (requires a paid plan) Data can be stored for as long as needed and read from a bucket as many times as
								needed
							</p>
							<p>
								- Deep Freeze data is retrieveable up to it's expiration date. If you'd like to delete the data before that
								it's expiration date, you can include an optional parameter in your request
							</p>
						</div>
						<CodeSnippet
							title="Delete data in a deep freeze bucket"
							code={`const url = 'https://quickfreeze.io/api/bucket';
const bucketEndpoint = '/funkyBucket';

const response = await fetch(url+bucketEndpoint+'/iceCubes', {
    headers: {
      'Authorization': 'Bearer {{web_token}}'
    },
	// will delete the data in a Deep Freeze bucket
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

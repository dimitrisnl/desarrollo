import {AtSymbolIcon} from '@heroicons/react/solid';

const VerifyRequest: React.FC = () => (
  <main className="min-h-screen">
    <section className="flex justify-center pt-36 pb-12 px-8">
      <div className="max-w-sm w-full space-y-6">
        <div className="flex justify-center">
          <div className="bg-blue-500 p-2.5 rounded-full">
            <AtSymbolIcon className="h-8 w-8 text-white mx-auto" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-semibold text-gray-800">
          Check your email
        </h2>
        <p className="text-center text-lg leading-snug text-gray-900">
          A sign in link has been sent <br /> to your email address.
        </p>
        <hr className="text-gray-200" />
        <div className="text-center">
          <a
            href="/"
            rel="noopener noreferrer"
            className="py-2 px-4 text-sm rounded-md font-medium text-white bg-blue-500 hover:bg-blue-600"
          >
            Back to home
          </a>
        </div>
      </div>
    </section>
  </main>
);

export default VerifyRequest;

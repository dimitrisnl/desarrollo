import {useRouter} from 'next/router';

import {verificationErrors} from '@/f/constants/verification-errors';

const Error: React.FC = () => {
  const router = useRouter();

  const errorCode = (router.query.error ?? 'default') as string;
  const error = verificationErrors[errorCode.toLowerCase()];

  return (
    <main className="min-h-screen">
      <section className="flex justify-center pt-36 pb-12 px-8">
        <div className="max-w-sm w-full space-y-8">
          <div>
            <div className="font-semibold text-lg text-center text-red-500">
              An error occurred
            </div>
            <h2 className="text-center text-2xl font-semibold text-gray-800">
              {error.title}
            </h2>
          </div>
          <p className="text-center text-lg leading-snug text-gray-900">
            {error.body}
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
};

export default Error;

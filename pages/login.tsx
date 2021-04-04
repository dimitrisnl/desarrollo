import {MailIcon} from '@heroicons/react/solid';
import {useRouter} from 'next/router';
import {signIn} from 'next-auth/client';
import {useState} from 'react';
import toast from 'react-hot-toast';

import {Spinner} from '@/f/components/spinner';
import {emailErrors} from '@/f/constants/email-errors';
import {INDEX_PAGE, VERIFY_REQUEST_PAGE} from '@/f/constants/pages';
import {
  ERROR,
  IDLE,
  LOADING,
  STATUS,
  SUCCESS,
} from '@/f/constants/request-statuses';

const Login: React.FC = () => {
  const router = useRouter();

  const [status, setStatus] = useState<STATUS>(IDLE);
  const [errorCode, setErrorCode] = useState<string | undefined>(undefined);

  async function handleSubmit(event) {
    event.preventDefault();

    if (status !== IDLE && status !== ERROR) {
      return;
    }

    if (errorCode) {
      setErrorCode(undefined);
    }
    setStatus(LOADING);

    const data = new FormData(event.target);

    signIn('email', {
      ...Object.fromEntries(data),
      redirect: false,
      callbackUrl: INDEX_PAGE,
    })
      .then(({error, ok}) => {
        if (error) {
          setStatus(ERROR);
          setErrorCode(error.toLowerCase());
        } else if (ok) {
          setStatus(SUCCESS);
          router.push(VERIFY_REQUEST_PAGE);
        }
      })
      .catch(() => {
        toast.error(
          <div>
            <div className="font-medium text-md">An error occurred</div>
            <div className="text-sm whitespace-nowrap">
              We&apos;re taking a look at it
            </div>
          </div>
        );
      });
  }

  const error = errorCode ? emailErrors[errorCode] : null;

  return (
    <main className="min-h-screen">
      <section className="flex justify-center pt-36 pb-12 px-8">
        <div className="max-w-sm w-full space-y-8">
          <h2 className="text-center text-3xl font-semibold text-gray-800">
            Sign in your account
          </h2>
          <div className="p-8 shadow-lg rounded-md border border-gray-100">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-600 font-medium p-2 rounded text-sm border-l-4 border-red-600">
                  {error}
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 text-sm block text-gray-800"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="johanna@acme.com"
                  required
                  autoComplete="email"
                  className="appearance-none bg-gray-100 block border-0 focus:border-blue-500 focus:outline-none focus:ring-blue-500 placeholder-gray-500 px-3 py-2 relative rounded-md text-md w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 flex focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium group hover:bg-blue-600 justify-center px-4 py-2 relative rounded-md text-md text-white w-full"
              >
                <span className="absolute flex inset-y-0 items-center left-0 pl-3">
                  <MailIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                </span>
                {status === LOADING ? (
                  <Spinner className="h-6 w-6 text-white" />
                ) : (
                  <span>Send me a magic link</span>
                )}
              </button>
            </form>
          </div>
          <hr className="text-gray-200" />
          <p className="text-xs text-gray-900 text-center mx-auto max-w-xs px-4">
            If you don&apos;t have an account already, you can create one by
            using the same form.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;

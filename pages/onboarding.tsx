import {OfficeBuildingIcon} from '@heroicons/react/outline';
import axios from 'axios';
import {useRouter} from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import {useQueryClient} from 'react-query';

import {ORG_ENDPOINT} from '@/b/constants/endpoints';
import {LoginRequired} from '@/f/components/login-required';
import {Spinner} from '@/f/components/spinner';
import {INDEX_PAGE} from '@/f/constants/pages';
import {ERROR, IDLE, LOADING} from '@/f/constants/request-statuses';
import {CURRENT_USER_KEY, useCurrentUser} from '@/f/requests/current-user';

const OnboardingContent: React.FC = () => {
  const {user} = useCurrentUser();
  const queryClient = useQueryClient();
  const [status, setStatus] = React.useState(IDLE);
  const router = useRouter();

  if (user?.membership) {
    router.push(INDEX_PAGE);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (status !== IDLE && status !== ERROR) {
      return;
    }

    const data = new FormData(event.target);
    setStatus(LOADING);

    axios
      .post(ORG_ENDPOINT, Object.fromEntries(data))
      .then(() => {
        queryClient.invalidateQueries(CURRENT_USER_KEY);
        router.push(INDEX_PAGE);
      })
      .catch((error) => {
        console.log(error);
        setStatus(ERROR);
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

  return (
    <main className="min-h-screen">
      <section className="flex justify-center pt-36 pb-12 px-8">
        <div className="max-w-sm w-full space-y-8">
          <h2 className="text-center text-3xl font-semibold text-gray-800">
            Let&apos;s create your organization
          </h2>
          <div className="p-8 shadow-lg rounded-md border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 text-sm block text-gray-800"
                >
                  Organization name
                </label>
                <input
                  type="text"
                  id="orgName"
                  name="orgName"
                  placeholder="ACME"
                  required
                  autoComplete="off"
                  className="appearance-none bg-gray-100 block border-0 focus:border-blue-500 focus:outline-none focus:ring-blue-500 placeholder-gray-500 px-3 py-2 relative rounded-md text-md w-full"
                />
              </div>
              <ul className="text-xs text-gray-700 list-disc list-inside ml-2 space-y-2 max-w-md">
                <li>
                  You will be assigned as the <b>owner</b> of this organization
                </li>
                <li>
                  You will be assigned to the <b>Basic</b> plan with a limit of
                  5 teammates <br /> <u>You can upgrade anytime</u>
                </li>
                <li>
                  You can later invite others with <b>admin</b> &{' '}
                  <b>read-only</b> privileges
                </li>
              </ul>
              <button
                type="submit"
                className="bg-blue-500 flex focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium group hover:bg-blue-600 justify-center px-4 py-2 relative rounded-md text-md text-white w-full"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <OfficeBuildingIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                </span>
                {status === LOADING ? (
                  <Spinner className="h-6 w-6 text-white" />
                ) : (
                  <span>Create organization</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

const OnboardingPage: React.FC = () => {
  return (
    <LoginRequired>
      <OnboardingContent />
    </LoginRequired>
  );
};

export default OnboardingPage;

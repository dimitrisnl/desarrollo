import {NextLink} from '@/f/components/next-link';
import {INDEX_PAGE} from '@/f/constants/pages';

const FourOhFour: React.FC = () => (
  <main className="min-h-screen">
    <section className="flex justify-center pt-36 pb-12 px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Page not found
        </h2>
        <div>
          <p className="text-center text-xl leading-snug">
            Sorry{' '}
            <span aria-label="sad" role="img">
              😔
            </span>
          </p>
          <p className="text-center text-xl leading-snug text-gray-800">
            We couldn’t find what you were looking for.
          </p>
        </div>
        <hr className="border-gray-200" />
        <div className="text-center">
          <NextLink
            href={INDEX_PAGE}
            className="py-2 px-4 text-sm rounded-md font-medium text-white bg-blue-500 hover:bg-blue-600"
          >
            Take me back home
          </NextLink>
        </div>
      </div>
    </section>
  </main>
);

export default FourOhFour;

import Link from 'next/link';

export const NextLink: React.FC<{href: string; className?: string}> = (
  props
) => {
  const {href, children, ...rest} = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

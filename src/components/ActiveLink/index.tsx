import { useRouter } from "next/dist/client/router";
import Link, { LinkProps } from "next/link";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  activeClassName: string;
  children: ReactElement;
}

export function ActiveLink({
  activeClassName,
  children,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  const page = `/${asPath.split("/")[1]}`;

  const className = page === rest.href ? activeClassName : "";

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className,
      })}
    </Link>
  );
}

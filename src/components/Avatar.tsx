/* eslint-disable import/no-anonymous-default-export */

interface IProps {
  url: string | undefined
  size?: number
  className?: string
  loading?: boolean
  onClick?: (e: any) => void
  'data-test-id'?: string
}

export default (props: IProps) => {
  const size = props.size || 42;
  return (
    <div
      className={props.className}
      style={{
        height: size,
        width: size,
      }}
      onClick={props.onClick}
      data-test-id={props['data-test-id']}
    >
      <div className="relative w-full h-full">
        <img
          className="rounded-full border-shadow overflow-hidden w-full h-full"
          src={props.url || 'https://static-assets.pek3b.qingstor.com/rum-avatars/default.png'}
          alt="avatar"
        />
        {props.loading && (
            <div className="absolute top-[-4px] right-[-7px] rounded-full dark:bg-white bg-black bg-opacity-70 flex items-center justify-center p-[3px] z-10">
              <p>Loading...</p>
            </div>
        )}
      </div>
    </div>
  );
};

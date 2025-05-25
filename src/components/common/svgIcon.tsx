import Image from 'next/image';

type IconButtonProps = {
  iconName: string;
  size?: number;
};

const Icon = ({ iconName, size }: IconButtonProps) => (
  <Image
    src={`inlinesvg/${iconName}.svg`}
    alt={iconName}
    width={size || 20}
    height={size || 20}
    data-testid="svgIcon"
  ></Image>
);

export default Icon;

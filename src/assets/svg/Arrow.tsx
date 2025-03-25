import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const ArrowSVG = (props: SvgProps) => (
  <Svg width={26} height={27} viewBox="0 0 26 27" fill="none" {...props}>
    <Path
      d="M10.3675 6.92419L3.79163 13.5L10.3675 20.0759"
      stroke="#616161"
      strokeWidth={1.625}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22.2083 13.5H3.97583"
      stroke="#616161"
      strokeWidth={1.625}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ArrowSVG;

import React from 'react';
import { FestiveBaublesGarland } from './FestiveBaublesGarland';

/**
 * Re-export FestiveBaublesGarland to replace gingerbread cookies
 * with authentic Christmas baubles ("bambalinas") & golden snowflakes
 * as requested by user.
 */
export const FestiveGingerbreadGarland: React.FC<{ className?: string }> = (props) => {
  return <FestiveBaublesGarland {...props} />;
};

export default FestiveGingerbreadGarland;

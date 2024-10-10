import { LoaderFunctionArgs } from 'react-router-dom';
import * as API from '@src/apis';

export async function attendanceEditLoader({ params }: LoaderFunctionArgs) {
  try {
    const { data: workInfo } = await API.attendance.get(params.id);
    //   return { organize: organize.data };

    return { workInfo: workInfo.data };
  } catch (error) {
    return { workInfo: {} };
  }
}

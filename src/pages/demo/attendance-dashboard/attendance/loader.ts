import { LoaderFunctionArgs } from 'react-router-dom';
import * as API from '@src/apis';

export async function attendancePageLoader({ request }: LoaderFunctionArgs) {
  try {
    const atttendances = await API.attendance.getAll();
    //   return { organize: organize.data };

    return { data: atttendances.data };
  } catch (error) {
    return { status: 'error', message: error };
  }
}

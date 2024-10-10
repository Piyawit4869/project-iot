// import { LoaderFunctionArgs } from 'react-router-dom';
// import * as API from '@src/apis';

export async function appointmentPageLoader() {
  // export async function appointmentPageLoader({ request }: LoaderFunctionArgs) {
  try {
    // const atttendances = await API.attendance.getAll();
    //   return { organize: organize.data };

    return { data: {} };
  } catch (error) {
    return { status: 'error', message: error };
  }
}

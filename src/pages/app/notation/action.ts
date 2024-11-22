import * as API from '@src/apis';
import { redirect } from 'react-router-dom';

export async function notationCreateAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  try {
    const {
      data: { data: res },
    } = await API.notations.create(JSON.parse(submitData.data));

    return redirect(`/notation/${res.id}`);
  } catch (error) {
    return {
      data: {
        action: 'create',
        status: 'error',
        message: 'Notation Created Failed !',
      },
    };
  }
}

export async function notationEditAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  switch (submitData.action) {
    case 'edit':
      try {
        const {
          data: { data: res },
        } = await API.notations.update(params.id, JSON.parse(submitData.data));

        return redirect(`/notation/${res.id}`);
      } catch (error) {
        return {
          data: {
            action: 'update',
            status: 'error',
            message: 'Notation Update Failed !',
          },
        };
      }

    case 'delete':
      try {
        await API.notations.deleted(params.id);

        return redirect(`/notation`);
      } catch (error) {
        return {
          data: {
            action: 'delete',
            status: 'error',
            message: 'Notation Delete Failed !',
          },
        };
      }
    default:
      break;
  }
}

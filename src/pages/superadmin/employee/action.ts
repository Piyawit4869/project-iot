export async function userCreateAction() {
  // const formData = await request.formData();
  // const submitData = Object.fromEntries(formData);

  try {
    //   await API.organize.create(JSON.parse(submitData.data));
    return {
      data: {
        action: 'create',
        status: 'success',
        message: 'Organize Created Successfully !',
      },
    };
  } catch (error) {
    return {
      data: {
        action: 'create',
        status: 'error',
        message: 'Organize Created Failed !',
      },
    };
  }
}

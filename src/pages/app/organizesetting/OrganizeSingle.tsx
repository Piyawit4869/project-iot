import * as API from '@src/apis';
import { Link, redirect } from 'react-router-dom';
import { Button, Table, notification } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

export async function organizeSingleLoader({ params }: any) {
  console.log(params);

  try {
    const organize = await API.organize.get(params.id);
    return { organize: organize.data.data };
  } catch (error) {
    return { error: 'error', message: error };
  }
}

export async function organizeSingleAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  switch (submitData.action) {
    case 'edit':
      try {
        await API.organize.update(params.id, JSON.parse(submitData.data));
        notification['success']({
          message: 'แก้ไขข้อมูลองค์กรเสร็จสิ้น',
          placement: 'bottomRight',
          duration: 3,
        });
        return redirect(`/admin/organize/${params.id}`);
      } catch (error) {
        notification['error']({
          message: 'แก้ไขข้อมูลองค์กรล้มเหลว',
          placement: 'bottomRight',
          duration: 3,
        });
        return {
          data: {
            action: 'create',
            status: 'error',
            message: 'Organize Created Failed !',
          },
        };
      }
    case 'delete':
      try {
        await API.organize.deleted(params.id);
        notification['success']({
          message: 'ลบข้อมูลองค์กรเสร็จสิ้น',
          placement: 'bottomRight',
          duration: 3,
        });
        return redirect('/admin/organize');
      } catch (error) {
        notification['error']({
          message: 'ลบข้อมูลองค์กรล้มเหลว',
          placement: 'bottomRight',
          duration: 3,
        });
        return {
          data: {
            action: 'create',
            status: 'error',
            message: 'Organize Created Failed !',
          },
        };
      }
    default:
      break;
  }
}
const columns = [
  {
    title: 'ลำดับ',
    dataIndex: 'num',
    key: 'num',
  },
  {
    title: 'ชื่อองค์กร',
    dataIndex: 'businessName',
    key: 'businessName',
  },
  {
    title: 'ประเภทธุรกิจ',
    dataIndex: 'businessType',
    key: 'businessType',
  },
  {
    title: 'โมเดล',
    dataIndex: 'businessModel',
    key: 'businessModel',
  },
  {
    title: 'ประเภทสาขา',
    dataIndex: 'branchType',
    key: 'branchType',
  },
  {
    title: 'โทรศัพท์',
    dataIndex: 'telephone',
    key: 'telephone',
  },
  {
    title: 'อีเมลล์',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'เว็บไซต์',
    dataIndex: 'websiteUrl',
    key: 'websiteUrl',
  },
  {
    title: 'รายละเอียด',
    key: 'details',
    dataIndex: 'id',
    render: (id: number) => {
      console.log(id);
      return (
        <Link to={`${id}`}>
          <Button
            style={{ fontSize: '16px', width: '180px' }}
            type="primary"
            icon={<EyeOutlined />}
          >
            ดูข้อมูล
          </Button>
        </Link>
      );
    },
  },
];
export const OrganizeSingle: React.FC = () => {
  // const { organize } = useLoaderData() as any;

  return (
    <div>
      {/* <OrganizeEditForm initialValues={API.organize} /> */}

      <Table
        columns={columns}
        dataSource={[]}
        // columns={columns}
        // dataSource={products}
        // dataSource={organize?.items ? organize?.items : []}
        pagination={false}
        bordered
      />
    </div>
  );
};

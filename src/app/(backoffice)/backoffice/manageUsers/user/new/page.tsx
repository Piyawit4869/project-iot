'use client';

import React from 'react';
import { createUser } from '@/pages/api/user/create';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import paginationRoles from '@/pages/api/role/pagination';
import paginationEmployeeRole from '@/pages/api/employeeRole/pagination';
import { useClientSession } from '@/libs/auth';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { FormUser } from '../../../components/formUser/formUser';

export default function CreateUserPage() {
  const [page] = React.useState(1);
  const [rowsPerPage] = React.useState(10);
  const [role, setRole] = React.useState([]) as any;
  const [employeeRole, setEmployeeRole] = React.useState([]) as any;
  const [errors, setErrors] = React.useState({}) as any;
  const router = useRouter();

  const me = useClientSession();

  React.useEffect(() => {
    const fetchRole = async () => {
      const { items: fetchedItems } = await paginationRoles({
        page,
        limit: rowsPerPage,
      });
      setRole(fetchedItems.items);
    };

    const fetchEmployeeRole = async () => {
      const { items: fetchedItems } = await paginationEmployeeRole({
        page,
        limit: rowsPerPage,
      });
      setEmployeeRole(fetchedItems.items);
    };

    fetchRole();
    fetchEmployeeRole();
  }, [page, rowsPerPage]);

  const onSubmit = React.useCallback(
    async (e: React.FormEvent, formData: any, uploadImg: string) => {
      e.preventDefault();

      const requiredFields = [
        'email',
        'userName',
        'role',
        'prefix',
        'firstNameTh',
        'firstName',
        'lastNameTh',
        'lastName',
      ];
      const newErrors: any = {};

      requiredFields.forEach((field) => {
        if (!formData[field] || formData[field].trim() === '') {
          newErrors[field] = `Field ${field} is required.`;
        }
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      try {
        const payload = {
          email: formData.email,
          userName: formData.userName,
          password: formData.password,
          active: formData.active,
          status: 'active',
          roleId: formData.role,
          employeeRoleId: formData.employeeRole,
          branchId: me?.branchId,
          profile: {
            prefix: formData.prefix,
            firstName: formData.firstName,
            lastName: formData.lastName,
            firstNameTh: formData.firstNameTh,
            lastNameTh: formData.lastNameTh,
            birthDate: formData.birthDate,
            phone: formData.phone,
            photoUrl: uploadImg,
          },
        };

        if (!payload.active) {
          payload.active = false;
        } else {
          payload.active = true;
        }

        const res = await createUser({}, payload);
        console.log(payload);
        toast.success('📝 สร้างข้อมูลผู้ใช้งานสำเร็จ!', {
          duration: 3000,
          position: 'bottom-left',
          style: { fontFamily: 'var(--font-ibm-sans)' },
        });

        router.push(`/backoffice/manageUsers/user/${res.data.id}`);
      } catch {
        toast.error('❌ ไม่สามารถสร้างข้อมูลผู้ใช้งานได้', {
          duration: 3000,
          position: 'bottom-left',
          style: { fontFamily: 'var(--font-ibm-sans)' },
        });
      }
    },
    [me?.branchId, router],
  );

  return (
    <div>
      <div className="fixed mt-6 ml-12 top-0 z-10">
        <Breadcrumb />
      </div>
      <FormUser
        onSubmit={onSubmit}
        role={role}
        employeeRole={employeeRole}
        error={errors}
      />
    </div>
  );
}

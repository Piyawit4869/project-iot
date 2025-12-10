import { CustomerDeail } from "../components/form-view/customer-deail";
import { OrganizationDetails } from "../components/form-view/organization-details";

export function CustomerDetailTabContent({
  customer,
  formUpdate,
  loadCustomer,
  onUpdate,
  isLoading,
  isPending,
  customerForms,
  handleCancel,
  handleEditForm,
}: any) {
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="w-full md:w-[50%]">
        <CustomerDeail
          customer={customer}
          form={formUpdate}
          loading={loadCustomer}
          onClick={onUpdate}
          disabled={isLoading || isPending}
          mode={
            customerForms.find((f: any) => f.key === "customer_detail")?.mode
          }
          onCancel={handleCancel}
          onEditForm={handleEditForm}
        />
      </div>
      <div className="w-full md:w-[50%]">
        <OrganizationDetails
          customer={customer}
          form={formUpdate}
          loading={loadCustomer}
          onClick={onUpdate}
          disabled={isLoading || isPending}
          mode={
            customerForms.find((f: any) => f.key === "organization_detail")
              ?.mode
          }
          onCancel={handleCancel}
          onEditForm={handleEditForm}
        />
      </div>
    </div>
  );
}

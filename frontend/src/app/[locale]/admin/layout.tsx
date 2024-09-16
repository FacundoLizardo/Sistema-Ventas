export default async function AdminLayour({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
    companyId: string;
  };
}>) {
  return (
    <main>
     
      {children}
    </main>
  );
}

/* 

        
        <CreateUserForm companyId={companyId} />
        <CreateCompanyForm />
    <CreateBranchForm companyId={companyId} users={users}/> 
   
*/

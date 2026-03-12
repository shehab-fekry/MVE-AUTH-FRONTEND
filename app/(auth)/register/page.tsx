import SignupForm from '@/src/components/forms/signup';

const Register = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const role = (await searchParams)?.role;

  return (
    <section className='flex h-[calc(100vh-69px)] w-full flex-col items-center justify-center'>
      <SignupForm role={role} />;
    </section>
  );
};

export default Register;

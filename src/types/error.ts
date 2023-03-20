

export function getErrorServerSideProps(status: number, signInPath: string) {
  if (!status) {
    return {
      props: { errorCode: 500 },
    }
  }

  if (status === 401) {
    return {
      redirect: {
        permanent: false,
        destination: signInPath,
      },
    }
  }

  return {
    props: { errorCode: status },
  }
}


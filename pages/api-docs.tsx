import "swagger-ui-react/swagger-ui.css";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";

const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false });
  
  function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
    return <SwaggerUI spec={spec} />;
  }
  
  export const getStaticProps: GetStaticProps = async () => {
    const spec: Record<string, any> = createSwaggerSpec({
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Lista de Tarefas',
          version: '1.0',
        },
      },
      schemaFolders: ['schemas']
    });
  
    return {
      props: {
        spec,
      },
    };
  };
  
  export default ApiDoc;

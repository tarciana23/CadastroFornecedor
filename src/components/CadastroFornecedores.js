import { Input, Form, Row, Col, Button, notification } from "antd";
import styles from "./cadastroFornecedores.module.css";

export function CadastroFornecedores({ onlistaFornecedores }) {

  function handleFinish(dados) {
    onlistaFornecedores(dados);

    notification.success({
      message: 'Sucesso!',
      description: 'Fornecedor cadastrado com sucesso!',
      placement: 'topRight'
    })
  }

  function handleFinishFailed(error){
    notification.error({
      message: 'Erro!',
      description: 'Por favor, preencha todos os campos obrigatórios',
      placement: 'topRight'
    })
  }

  return (
    <Form
      style={{
        padding: "2rem",
        borderRadius: "1rem",
        background: "#fff",
        height: "70vh"
      }}
      layout="vertical"
      justify="center"
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
    >
      <h1 className={styles.titulo}>Cadastre um fornecedor !</h1>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item 
            label="Razão Social" 
            name={["razaoSocial"]} 
            className={styles.customLabel}
            rules={[{required: true,message: 'Por favor, insira a razão social!'}]}
          >
            <Input placeholder="Razão Social" className={styles.customInput} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item 
            label="Nome Fantasia" 
            name={["nomeFantasia"]} 
            className={styles.customLabel}
            rules={[{required: true,message: 'Por favor, insira o nome fantasia!'}]}

          >
            <Input placeholder="Nome Fantasia" className={styles.customInput} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item 
            label="Endereço Completo" 
            name={["enderecoCompleto"]} 
            className={styles.customLabel}
            rules={[{required: true,message: 'Por favor, insira o endereço completo!'}]}
          >
            <Input
              placeholder="Endereço completo"
              className={styles.customInput}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item 
            label="Produtos Fornecidos" 
            name={["produtosFornecidos"]} 
            className={styles.customLabel}
            rules={[{required: true,message: 'Por favor, insira o produto fornecido !'}]}

          >
            <Input
              className={styles.customInput}
              placeholder="Produtos fornecidos"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Button htmlType="submit" className={styles.customButton}>
          Salvar
        </Button>
      </Row>
    </Form>
  );
}

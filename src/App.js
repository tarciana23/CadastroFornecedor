import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { FormOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

import { Fornecedores } from './components/Fornecedores';
import { CadastroFornecedores } from './components/CadastroFornecedores';

import styles from "./app.module.css"


const { Header, Content, Footer, Sider } = Layout;

//Definindo as páginas do sistema
const items = [
  { label: 'Cadastro', key: '1', icon: <FormOutlined color='#ff6421' backgroundColor='#ff6421'/>, path: '/cadastro' },
  { label: 'Lista', key: '2', icon: <UnorderedListOutlined color='#ff6421'/>, path: '/fornecedores' }
];

//Listando fornecedores pré cadastrados
const initialFornecedores = [
  { key: '1', razaoSocial: 'Empresa A LTDA', nomeFantasia: 'Empresa A', enderecoCompleto: 'Rua A, Bairro A, Cidade A', produtosFornecidos: 'Produto A' },
  { key: '2', razaoSocial: 'Empresa B LTDA', nomeFantasia: 'Empresa B', enderecoCompleto: 'Rua B, Bairro B, Cidade B', produtosFornecidos: 'Produto B' },
  { key: '3', razaoSocial: 'Empresa C LTDA', nomeFantasia: 'Empresa C', enderecoCompleto: 'Rua C, Bairro C, Cidade C', produtosFornecidos: 'Produto C' },
  { key: '4', razaoSocial: 'Empresa D LTDA', nomeFantasia: 'Empresa D', enderecoCompleto: 'Rua D, Bairro D, Cidade D', produtosFornecidos: 'Produto D' },
  { key: '5', razaoSocial: 'Empresa E LTDA', nomeFantasia: 'Empresa E', enderecoCompleto: 'Rua E, Bairro E, Cidade E', produtosFornecidos: 'Produto E' },
  { key: '6', razaoSocial: 'Empresa F LTDA', nomeFantasia: 'Empresa F', enderecoCompleto: 'Rua F, Bairro F, Cidade F', produtosFornecidos: 'Produto F' }
];


const App = () => {

  //estado para controle dos fornecedores
  const [fornecedores, setFornecedores] = useState(initialFornecedores);

  //função para exibir os fornecedores cadastrados
  function listaFornecedores(fornecedor) {
    setFornecedores([...fornecedores, { ...fornecedor, key: (fornecedores.length + 1).toString() }]);
  }

  return (
    <Router>
      <Layout 
        style={{ 
          minHeight: '100%',          
        }}
      >
        <Sider
          style={{
            background: "#001529",
          }}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="demo-logo-vertical" />
          <Menu 
            style={{ 
              background: "#001529"
            }} 
            mode="inline" defaultSelectedKeys={['1']}
          >
            {items.map(item => (
              <Menu.Item 
                key={item.key} 
                icon={item.icon}
                style={{
                    marginTop: "2rem",
                    fontSize: "1rem",
                    color: "#ff6421",
                    fontWeight: "bold"
                }}
              >
                <Link 
                  to={item.path} 
                  styles={{
                    color: "#ff6421",
                  }}
                >
                  {item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
            }}
          />
          <Content className={styles.content}>
            <div
              style={{
                padding: 24,
                minHeight: "100%",
                background: "#f3f2ec",
                borderRadius: "10px",
              }}
            >
              <Routes>
                <Route path="/cadastro" element={<CadastroFornecedores onlistaFornecedores={listaFornecedores} />} />
                <Route path="/fornecedores" element={<Fornecedores fornecedores={fornecedores} />} />
              </Routes>
            </div>
          </Content>
          <Footer className={styles.footer}>
            Desenvolvido por Tarciana Oliveira
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;

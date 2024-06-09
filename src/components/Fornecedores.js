import { Table, Button, Input } from 'antd';
import { useState, useEffect } from 'react';
import { SearchOutlined } from "@ant-design/icons";

import styles from './fornecedores.module.css'

const { Search } = Input;

export function Fornecedores({ fornecedores: initialFornecedores,  }) {

  const [search, setSearch] = useState('');//estado para a busca de um fornecedor
  const [fornecedores, setFornecedores] = useState(initialFornecedores); //pegando a lista de fornecedores cadastrados
  const [keyEditando, setKeyEditando] = useState('');//estado para capturar o usuário está editando, se é a razão social ou nome fantasia ... ou outro input
  const [editado, setEditado] = useState(null);// salvar o que de fato o usuário digitou para atualizar seu novo valor

  const [currentPage, setCurrentPage] = useState(1);//estado para a página em que o usuário se encontra

  const pageSize = 5;// quantidade de fornecedores que é exibido por página

  //Colunas em que os dados dos fornecedores serão encaixados
  const columns = [
    {
      title: 'Razão Social',
      dataIndex: 'razaoSocial',
      key: 'razaoSocial',
      render: (text, record) => {
        return keyEditando === record.key ? (
          <Input
            value={editado.razaoSocial}
            onChange={(e) => handleFieldChange(e, 'razaoSocial')}
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'Nome Fantasia',
      dataIndex: 'nomeFantasia',
      key: 'nomeFantasia',
      render: (text, record) => {
        return keyEditando === record.key ? (
          <Input
            value={editado.nomeFantasia}
            onChange={(e) => handleFieldChange(e, 'nomeFantasia')}
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'Endereço',
      dataIndex: 'enderecoCompleto',
      key: 'enderecoCompleto',
      render: (text, record) => {
        return keyEditando === record.key ? (
          <Input
            value={editado.enderecoCompleto}
            onChange={(e) => handleFieldChange(e, 'enderecoCompleto')}
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'Produtos Fornecidos',
      dataIndex: 'produtosFornecidos',
      key: 'produtosFornecidos',
      render: (text, record) => {
        return keyEditando === record.key ? (
          <Input
            value={editado.produtosFornecidos}
            onChange={(e) => handleFieldChange(e, 'produtosFornecidos')}
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (record) => {
        const isEditando = keyEditando === record.key;
        return isEditando ? (
         <div className={styles.acoes}>
            <Button className={styles.editar}  onClick={() => saveEdit(record.key)}>Salvar</Button>
            <Button  className={styles.excluir} onClick={cancelEdit}>Cancelar</Button>
        </div>
        ) : (
         <div className={styles.acoes}>
            <Button className={styles.editar}  onClick={() => edit(record)}>Editar</Button>
            <Button   className={styles.excluir} type="danger"  onClick={() => handleDelete(record)}>Excluir</Button>
        </div>
        );
      },
    },
  ];

  //Funções relacionadas a edição de um fornecedores
  const edit = (record) => {
    setKeyEditando(record.key);
    setEditado({ ...record });
  };

  const cancelEdit = () => {
    setKeyEditando('');
    setEditado(null);
  };

  const handleFieldChange = (e, fieldName) => {
    setEditado({ ...editado, [fieldName]: e.target.value });
  };

  const saveEdit = (key) => {
    const updatedFornecedores = fornecedores.map((fornecedor) =>
      fornecedor.key === key ? editado : fornecedor
    );
    setFornecedores(updatedFornecedores);
    setKeyEditando('');
    setEditado(null);
  };

  //monitora a mudança de páginas e atualiza o currentPage para a página atual 
  useEffect(() => {
    if ((currentPage - 1) * pageSize >= fornecedores.length && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [fornecedores, currentPage]);

  
  //Função para passar o fornecedor para ser excluído
  const handleDelete = (record) => {
   const updatedFornecedores = fornecedores.filter((f) => f.key !== record.key);
   setFornecedores(updatedFornecedores);
  };

  //Função para buscar um fornecedor em específo
  const buscarFornecedor = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

//Função para dividir os fornecedores de 5 em 5, pois é exibido 5 por página
  const getFornecedoresPaginados = () => {
    const filteredFornecedores = fornecedores.filter((fornecedor) =>
      fornecedor.razaoSocial.toLowerCase().includes(search.toLowerCase())
    );
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredFornecedores.slice(startIndex, endIndex);
  };


  //Função para avançar para a próxima página
  const nextPage = () => {
    if (currentPage < Math.ceil(fornecedores.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  //Função para retornar para a próxima página
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
    <h1 className={styles.titulo}>Fornecedores</h1>
    <Search
        className={styles.search}
        placeholder="Buscar fornecedor ..."
        value={search}
        onChange={buscarFornecedor}
        enterButton = {<SearchOutlined className={styles.customSearchIcon}/>}
    />
    <Table
        className={styles.table}
        dataSource={getFornecedoresPaginados()}
        columns={columns}
        pagination={false}
        rowKey="key"
        locale={{
            emptyText: 'Não existem fornecedores cadastrados!',
        }}
    />
    <div className={styles.pagination}>
        <Button
            disabled={currentPage === 1}
            onClick={prevPage}
        >
            Anterior
        </Button>
        <span style={{ margin: '0 16px' }}>
            {currentPage} / {Math.ceil(fornecedores.length / pageSize)}
        </span>
        <Button
            disabled={currentPage === Math.ceil(fornecedores.length / pageSize)}
            onClick={nextPage}
        >
            Próxima
        </Button>
    </div>
</div>

  )
}
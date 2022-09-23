document.getElementById("variavel").innerHTML = geraConformeBanco([`id_evento`, `setor`, `nome`, `data_inicio`, `data_termino`, `inscricaopaga`, `vagaslimitadas`, `quantidadevagas`, `banner`, `bannerpaginainicial`, `bannerpaginaexpositor`, `logo`, `logopequena`, `mailtopo`, `mailrodape`, `imagempfacebook`, `keywords`, `description`, `sobreoevento`, `siteativo`, `habilitar`]);

document.getElementById("escreve").innerHTML = gerarCrud('evento','eventos','id_evento',[`id_evento`, `setor`, `nome`, `data_inicio`, `data_termino`, `inscricaopaga`, `vagaslimitadas`, `quantidadevagas`, `banner`, `bannerpaginainicial`, `bannerpaginaexpositor`, `logo`, `logopequena`, `mailtopo`, `mailrodape`, `imagempfacebook`, `keywords`, `description`, `sobreoevento`, `siteativo`, `habilitar`]);

function gerarCrud(classenome,tabela,coluna, varia = []){
    // Aqui gera o insert do nossso Crud
   var string = "" 
    string += `<h1>INSERE </h1> <br><br>`
     string  += (`
    require('../model/${classenome}.php');<br>
    require('../../../service/conexaoBD.php');<br>
    
    {<br>
        function adicionar($${classenome}  $${classenome}){<br>`);
    
    varia.forEach(function(parm){
        string += `$${parm} = $evento->get<span class="letra">${firtsMaiscula(parm)}();<span><br>`;
    })
    string += `$aleatorio = rand(6,6);<br>`;
    string += `do{<br>`
    string += `$valor = substr(str_shuffle("459898957455598955659865989859587"), 0, $aleatorio);<br>`
    string += `}while($valor ==  $this->confere_se_existe("${tabela}",$valor,"${coluna}"));<br>`
    string += `$validaid = $this->confere_se_existe("${tabela}",$valor,"${coluna}");<br>`
    string += `try {<br>`
    string += `if(!$validaid ) {<br>`
    string += `$sql = "INSERT INTO ${tabela} (`
    varia.forEach(function(mysql){
        string += `${mysql},`;
    })
    string += `)<br>`
    string += ` VALUES (`
    var indice = 0;
    varia.forEach(function(mysql){
        string += `:${mysql}`;
        if(indice < (varia.length - 1)){
            string += `,`; 
        }
        indice++;
    })
    string += `);";<br>`
    string += `$db = Database::getInstance()->getConnection();<br>`
    string += `$stmt = $exec = $db->prepare($sql);<br>`
    varia.forEach(function(mysql){
        string += `$stmt->bindParam(':${mysql}',$${mysql});<br>`;
    })
    string += `$stmt->execute();<br>`
    string += ` }else{;<br>`
    string += `echo "Você já existe na nossa base de dados";<br>`
    string += ` }"<br>`
    string += `}catch(PDOException $e){<br>`
    string += `echo "Falho a conexão tente novamente recarregue a página!!! Erro: " . $e->getMessage();<br>`
    string += `}<br>`
    string += `}<br>`
    // fIM INSERT
    string += `<br>`
    string += `<br>`
    //Read
    string += `<h1>LEITURA </h1> <br><br>`
    string += `try {<br>`
    string += `$stmt = $conexao->prepare("SELECT * FROM ${tabela}"); {<br>`
    string += `if ($stmt->execute()) { {<br>`
    string += `while ($rs = $stmt->fetch(PDO::FETCH_OBJ)) { {<br>`
    string += `return $rs;<br>`
    string += `};<br>`
    string += `} else {;<br>`
    string += `echo "Erro: Não foi possível recuperar os dados do banco de dados";<br>`
    string += ` }<br>`
    string += ` } catch (PDOException $erro) {<br>`
    string += `echo "Erro: ".$erro->getMessage();<br>`
    string += `}`
    //FIM LEITURA
    string += `<br>`
    string += `<br>`
    // Update
    string += `<h1>UPDATE </h1> <br><br>`
    string += `try {<br>`
    string += `$sql = "UPDATE ${tabela} SET  (`
    varia.forEach(function(mysql){
        string += `${mysql},`;
    })
    string += `)<br>`
    string += ` VALUES (`
    var indice = 0;
    varia.forEach(function(mysql){
        string += `:${mysql}`;
        if(indice < (varia.length - 1)){
            string += `,`; 
        }
        indice++;
    })
    string += `) WHERE id = $id;"<br>`
    string += `$db = Database::getInstance()->getConnection();<br>`
    string += `$stmt = $exec = $db->prepare($sql);<br>`
    varia.forEach(function(mysql){
        string += `$stmt->bindParam(':${mysql}',$${mysql});<br>`;
    })
    string += `$stmt->execute();<br>`
    string += ` }else{;<br>`
    string += `echo "Você já existe na nossa base de dados";<br>`
    string += ` }";<br>`
    string += `}catch(PDOException $e){<br>`
    string += `echo "Falho a conexão tente novamente recarregue a página!!! Erro: " . $e->getMessage();<br>`
    string += `}<br>`
    string += `}<br>`
     //FIM UPDATE
     string += `<br>`
     string += `<br>`
     //DELETE
     string += `<h1>DELETE </h1> <br><br>`
     string += `try { <br>`
     string += `$stmt = $conexao->prepare("DELETE  FROM contatos WHERE id = $id"); <br>`
     string += `$stmt->bindParam(1, $id, PDO::PARAM_INT); <br>`
     string += ` if ($stmt->execute()) { <br>`
     string += ` echo "Registo foi excluído com êxito"; <br>`
     string += ` $id = null; <br>`
     string += ` } else { <br>`
     string += ` throw new PDOException("Erro: Não foi possível executar a declaração sql");<br>`
     string += `}<br>`
     string += `} catch (PDOException $erro) {<br>`
     string += `echo "Erro: ".$erro->getMessage();<br>`
     string += `}<br>`
     

    return string;
}

function firtsMaiscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}




function geraConformeBanco(variavel = []){
    var string = "";
    string += `<h1>VARIAVEIS USAR NO MODEL </h1> <br><br>`
    variavel.forEach(function(parm){
        string += `$${parm};<br>`;
    }) 

    return string;
}



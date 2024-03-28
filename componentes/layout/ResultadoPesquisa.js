import Avatar from "../avatar";

export default function ResultadoPesquisa({
  nome,
  email,
  avatar,
  aoClicar,
  id,
}) {
  return (
    <div className="resultadoPesquisa" onClick={() => aoClicar(id)}>
      <Avatar src={avatar} />
      <div className="informacaoUsuario">
        <strong>{nome}</strong>
        <span>{email}</span>
      </div>
    </div>
  );
}

import { useState } from "react";
import { ArrowUpRight, Facebook, Play, X } from "lucide-react";
import "./PublicacionesSociales.css";

function esEnlaceFacebookSeguro(enlace) {
  try {
    const url = new URL(enlace);
    return (
      url.protocol === "https:" &&
      ["facebook.com", "www.facebook.com", "m.facebook.com"].includes(url.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
}

function tipoLegible(tipo) {
  if (tipo === "reel") return "Reel";
  if (tipo === "video") return "Vídeo";
  return "Publicación";
}

// Facebook suele exigir un enlace canónico (/posts/, /reel/, /videos/).
// Con enlaces /share/ se ofrece una vista de prueba, sin asegurar que cargue.
function urlVistaPrevia(publicacion) {
  const video = ["video", "reel"].includes(publicacion.tipo);
  const plugin = video ? "video.php" : "post.php";
  const params = new URLSearchParams({
    href: publicacion.url,
    width: "500",
    show_text: "true",
  });
  return `https://www.facebook.com/plugins/${plugin}?${params.toString()}`;
}

export default function PublicacionesSociales({ publicaciones = [] }) {
  const [abiertas, setAbiertas] = useState({});
  const entradas = publicaciones.filter(
    (p) => p?.id && p.plataforma === "facebook" && esEnlaceFacebookSeguro(p.url)
  );

  if (entradas.length === 0) return null;

  return (
    <section className="redes-noticias" aria-labelledby="titulo-redes-noticias">
      <div className="redes-noticias__encabezado">
        <div>
          <span className="redes-noticias__eyebrow">Desde Facebook</span>
          <h2 id="titulo-redes-noticias">Publicaciones compartidas</h2>
          <p>
            {entradas.length} enlaces públicos seleccionados. Pulsa «Ver en Facebook»
            para consultar el texto, las fotos o el vídeo original.
          </p>
        </div>
      </div>

      <div className="redes-noticias__grid">
        {entradas.map((p) => {
          const abierta = Boolean(abiertas[p.id]);
          return (
            <article className="redes-noticias__tarjeta" key={p.id}>
              <div className="redes-noticias__meta">
                <Facebook size={19} aria-hidden="true" />
                <span>Facebook · {tipoLegible(p.tipo)}</span>
              </div>
              <h3>{p.titulo}</h3>
              <p>
                Contenido disponible en la publicación original. Su descripción,
                autor y fecha no se han verificado todavía.
              </p>

              {!abierta && (
                <div className="redes-noticias__placeholder">
                  <Facebook size={37} aria-hidden="true" />
                  <span>{tipoLegible(p.tipo)} de Facebook</span>
                </div>
              )}

              {abierta && (
                <div className="redes-noticias__insercion">
                  <iframe
                    title={`Vista previa: ${p.titulo}`}
                    src={urlVistaPrevia(p)}
                    width="500"
                    height="570"
                    loading="lazy"
                    allow="encrypted-media; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                  <small>
                    Facebook puede no admitir la inserción de enlaces «/share/».
                    Si no aparece contenido, utiliza «Ver en Facebook».
                  </small>
                </div>
              )}

              <div className="redes-noticias__acciones">
                <button
                  type="button"
                  onClick={() => setAbiertas((actual) => ({
                    ...actual,
                    [p.id]: !actual[p.id],
                  }))}
                >
                  {abierta ? <X size={16} /> : <Play size={16} />}
                  {abierta ? "Cerrar vista previa" : "Probar vista previa"}
                </button>
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  Ver en Facebook <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
      <p className="redes-noticias__nota">
        Estos enlaces fueron seleccionados manualmente. Las Huecas de Esmeraldas
        no administra las cuentas ni aloja las imágenes o vídeos. Al activar una
        vista previa, el navegador contactará con Facebook.
      </p>
    </section>
  );
}

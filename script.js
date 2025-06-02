
        document.addEventListener('DOMContentLoaded', function() {
            const btnAbrirModal = document.getElementById('btnAbrirModal');
            const modal = document.getElementById('modalNovaDenuncia');
            const btnCloseModal = document.getElementById('btnCloseModal');
            const formNovaDenuncia = document.getElementById('formNovaDenuncia');
            const feedDenuncias = document.getElementById('feed-denuncias');

          
            if (btnAbrirModal) {
                btnAbrirModal.addEventListener('click', () => {
                    modal.style.display = 'flex';
                });
            }

            
            if (btnCloseModal) {
                btnCloseModal.addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            }

            
            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });

           
            if (formNovaDenuncia) {
                formNovaDenuncia.addEventListener('submit', function(event) {
                    event.preventDefault();

                    const titulo = document.getElementById('tituloDenuncia').value;
                    const categoria = document.getElementById('categoriaDenuncia').value;
                    const categoriaTexto = document.getElementById('categoriaDenuncia').options[document.getElementById('categoriaDenuncia').selectedIndex].text;
                    const descricao = document.getElementById('descricaoDenuncia').value;

                    if (titulo && categoria && descricao) {
                        adicionarCardAoFeed(titulo, categoria, categoriaTexto, descricao);
                        formNovaDenuncia.reset();
                        modal.style.display = 'none';
                        alert('Sua contribuição foi enviada com sucesso!');
                    } else {
                        alert('Por favor, preencha todos os campos.');
                    }
                });
            }

            function adicionarCardAoFeed(titulo, categoriaSlug, categoriaTexto, descricao) {
                const novoCard = document.createElement('article');
                novoCard.classList.add('card-ideia');

                novoCard.innerHTML = `
                    <h3>${titulo}</h3>
                    <span class="card-categoria ${categoriaSlug}">${categoriaTexto}</span>
                    <p>${descricao}</p>
                    <div class="interacoes">
                        <button class="btn-curtir"><i class="fas fa-heart"></i> Curtir (<span class="curtidas-count">0</span>)</button>
                        <button class="btn-comentar"><i class="fas fa-comment"></i> Comentar (<span class="comentarios-count">0</span>)</button>
                    </div>
                    <div class="comentarios-secao" style="display: none;">
                        <ul class="lista-comentarios">
                            </ul>
                        <form class="form-novo-comentario">
                            <textarea name="novo-comentario-texto" placeholder="Escreva seu comentário..." rows="2" required></textarea>
                            <button type="submit">Comentar</button>
                        </form>
                    </div>
                `;
                feedDenuncias.prepend(novoCard);
                adicionarListenersInteracao(novoCard);
            }

            function adicionarListenersInteracao(cardElement) {
                const btnCurtir = cardElement.querySelector('.btn-curtir');
                const curtidasCountSpan = cardElement.querySelector('.curtidas-count');
                
                
                btnCurtir.addEventListener('click', () => {
                    let currentCurtidas = parseInt(curtidasCountSpan.textContent);
                    if (btnCurtir.classList.contains('curtido')) {
                        currentCurtidas--;
                        btnCurtir.classList.remove('curtido');
                        btnCurtir.innerHTML = `<i class="fas fa-heart"></i> Curtir (<span class="curtidas-count">${currentCurtidas}</span>)`;
                    } else {
                        currentCurtidas++;
                        btnCurtir.classList.add('curtido');
                        btnCurtir.innerHTML = `<i class="fas fa-heart"></i> Curtido (<span class="curtidas-count">${currentCurtidas}</span>)`;
                    }
                   
                    cardElement.querySelector('.btn-curtir .curtidas-count').textContent = currentCurtidas;
                });

                const btnComentarToggle = cardElement.querySelector('.btn-comentar');
                const comentariosSecao = cardElement.querySelector('.comentarios-secao');
                const comentariosCountSpan = btnComentarToggle.querySelector('.comentarios-count');
                const listaComentarios = comentariosSecao.querySelector('.lista-comentarios');
                const formNovoComentario = comentariosSecao.querySelector('.form-novo-comentario');
                const textareaComentario = formNovoComentario.querySelector('textarea');

                btnComentarToggle.addEventListener('click', () => {
                    const isHidden = comentariosSecao.style.display === 'none' || comentariosSecao.style.display === '';
                    comentariosSecao.style.display = isHidden ? 'block' : 'none';
                    if (isHidden) {
                        textareaComentario.focus();
                    }
                });
                
                formNovoComentario.addEventListener('submit', function(event) {
                    event.preventDefault();
                    const textoComentario = textareaComentario.value.trim();

                    if (textoComentario) {
                        const novoComentarioItem = document.createElement('li');
                        novoComentarioItem.classList.add('comentario-item');
                        novoComentarioItem.textContent = textoComentario;
                        listaComentarios.appendChild(novoComentarioItem);
                        
                        textareaComentario.value = ''; 

                        
                        let currentComentarios = parseInt(comentariosCountSpan.textContent);
                        currentComentarios++;
                        comentariosCountSpan.textContent = currentComentarios;
                    }
                });
            }

            
            document.querySelectorAll('.card-ideia').forEach(card => {
                adicionarListenersInteracao(card);
            });

        });
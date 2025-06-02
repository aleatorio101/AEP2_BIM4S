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
                `;
                feedDenuncias.prepend(novoCard);
                adicionarListenersInteracao(novoCard);
            }

           
            function adicionarListenersInteracao(cardElement) {
                const btnCurtir = cardElement.querySelector('.btn-curtir');
                const curtidasCountSpan = cardElement.querySelector('.curtidas-count');
                let curtidasCount = parseInt(curtidasCountSpan.textContent);

                btnCurtir.addEventListener('click', () => {
                    if (btnCurtir.classList.contains('curtido')) {
                        curtidasCount--;
                        btnCurtir.classList.remove('curtido');
                        btnCurtir.innerHTML = `<i class="fas fa-heart"></i> Curtir (<span class="curtidas-count">${curtidasCount}</span>)`;
                    } else {
                        curtidasCount++;
                        btnCurtir.classList.add('curtido');
                        btnCurtir.innerHTML = `<i class="fas fa-heart"></i> Curtido (<span class="curtidas-count">${curtidasCount}</span>)`;
                    }
                   
                    btnCurtir.querySelector('.curtidas-count').textContent = curtidasCount;
                });

                const btnComentar = cardElement.querySelector('.btn-comentar');
                const comentariosCountSpan = cardElement.querySelector('.comentarios-count');
                let comentariosCount = parseInt(comentariosCountSpan.textContent);

                
                btnComentar.addEventListener('click', () => {
                    comentariosCount++;
                    comentariosCountSpan.textContent = comentariosCount;
                    alert('Funcionalidade de comentar seria expandida aqui!');
                });
            }

           
            document.querySelectorAll('.card-ideia').forEach(card => {
                adicionarListenersInteracao(card);
            });

        });
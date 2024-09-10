class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        const recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: ['macaco', 'macaco', 'macaco'] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: ['gazela'] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: ['leao'] },
        ];

        const animais = {
            'LEAO': { tamanho: 3, biomas: ['savana'] },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'] },
            'CROCODILO': { tamanho: 3, biomas: ['rio'] },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'] },
            'GAZELA': { tamanho: 2, biomas: ['savana'] },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'] },
        };

        
        if (!animais[animal]) {
            return { erro: 'Animal inválido' };
        }

        
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: 'Quantidade inválida' };
        }

        const animalInfo = animais[animal];
        const recintosViaveis = [];

        for (const recinto of recintos) {
            const espacoOcupado = recinto.animaisExistentes.length * animalInfo.tamanho;
            const espacoNecessario = quantidade * animalInfo.tamanho;
            const espacoExtra = recinto.animaisExistentes.length > 0 ? 1 : 0;
            const espacoLivre = recinto.tamanhoTotal - espacoOcupado - espacoNecessario - espacoExtra;

            
            if (animalInfo.biomas.includes(recinto.bioma) && espacoLivre >= 0) {
                const carnivoros = ['LEAO', 'LEOPARDO', 'CROCODILO'];
                const herbivoros = ['GAZELA', 'HIPOPOTAMO'];
                const macacos = ['MACACO'];

                const animaisExistentes = recinto.animaisExistentes.map(a => a.toUpperCase());
                const isCarnivoro = carnivoros.includes(animal);
                const isHerbivoro = herbivoros.includes(animal);
                const isMacaco = macacos.includes(animal);

                if (isCarnivoro && animaisExistentes.some(a => !carnivoros.includes(a))) {
                    continue;
                }

                if (isHerbivoro && animal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
                    continue;
                }

                if (isMacaco && recinto.animaisExistentes.length === 0) {
                    continue;
                }

                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };

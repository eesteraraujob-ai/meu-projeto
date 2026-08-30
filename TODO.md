# TODO — Próximos passos

Levantamento original feito em 2026-08-25; revisado em 2026-08-29 e 2026-08-30 depois de sincronizar o código com [tasks.md](specs/001-task-manager/tasks.md).

**Resumo:** os gaps do levantamento original (refresh da lista, filtro por data, validação de prioridade/status, normalização de data, tsconfig, componentização, transições de status, resumo de progresso, suporte a web, inconsistência async/sync no repositório) foram todos resolvidos e verificados no código. `tasks.md` está sincronizado com a realidade. Resta um item em aberto.

---

## Pendências

### 1. Validar o quickstart num dispositivo/simulador real (T024)
Ainda não rodamos o app de ponta a ponta fora do ambiente de desenvolvimento. Última tentativa (29/08): Expo Go via LAN (`exp://192.168.3.43:8081`) falhou com `TypeError: fetch failed` antes mesmo de o pedido chegar ao Metro — provavelmente isolamento de cliente (AP isolation) na rede Wi-Fi usada no momento, não um problema no app ou no Firewall do Windows (já confirmado que há uma regra "Allow" para `node.exe` no perfil Public).

- Retestar na rede de casa do usuário; se persistir, considerar modo túnel (`@expo/ngrok`, ainda não instalado).
- Depois de conectar, rodar o roteiro completo de [quickstart.md](specs/001-task-manager/quickstart.md) como validação manual final.

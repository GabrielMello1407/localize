import cron from 'node-cron';
import prismadb from '@/lib/prismadb';

// Scheduled task to automatically close events
cron.schedule('0 0 * * *', async () => {
  console.log('Iniciando tarefa de encerramento automático de eventos...');

  try {
    const eventsFinished = await prismadb.event.updateMany({
      where: {
        date: { lt: new Date() },
        finished: false,
      },
      data: { finished: true },
    });

    console.log(`Eventos encerrados automaticamente: ${eventsFinished.count}`);
  } catch (error) {
    console.error('Erro ao encerrar eventos automaticamente:', error);
  }
});

import { Injectable } from '@nestjs/common/decorators';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export default class MessagesRepository {
  async findOne(id: string) {
    const contetns = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(contetns);

    return messages[id];
  }

  async findAll() {
    const contetns = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(contetns);

    return messages;
  }

  async create(content: string) {
    const contetns = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(contetns);

    const id = Math.floor(Math.random() * 999);
    messages[id] = { id, content };

    await writeFile('messages.json', JSON.stringify(messages));
  }
}

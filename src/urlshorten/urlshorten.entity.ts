import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  DataType,
  Index,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'short_links',
})
export class ShortLinks extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Index({
    // index options
    name: 'short-url-index',
    type: 'UNIQUE',
    unique: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  short_url: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  original_url: string;

  @CreatedAt
  created_at: Date;
}

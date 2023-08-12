-- CreateTable
CREATE TABLE "HorseracePayment" (
    "id" BIGSERIAL NOT NULL,
    "racecourse" BIGINT NOT NULL,
    "race" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HorseracePayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Machine" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "is_pachinko" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "machine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PachisloPayment" (
    "id" BIGSERIAL NOT NULL,
    "shop" BIGINT NOT NULL,
    "kind" VARCHAR NOT NULL,
    "machine" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMPTZ(6),
    "rate" BIGINT NOT NULL,

    CONSTRAINT "pachislo_payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" BIGSERIAL NOT NULL,
    "date" DATE NOT NULL,
    "pachislo_payment_id" BIGINT,
    "horserace_payment_id" BIGINT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMPTZ(6),
    "pay" BIGINT NOT NULL,
    "payback" BIGINT NOT NULL,
    "memo" VARCHAR,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Racecourse" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "racecourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rate" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "is_pachinko" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "nickname" VARCHAR NOT NULL,
    "like" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- AddForeignKey
ALTER TABLE "HorseracePayment" ADD CONSTRAINT "HorseracePayment_race_fkey" FOREIGN KEY ("race") REFERENCES "Race"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "HorseracePayment" ADD CONSTRAINT "HorseracePayment_racecourse_fkey" FOREIGN KEY ("racecourse") REFERENCES "Racecourse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PachisloPayment" ADD CONSTRAINT "PachisloPayment_machine_fkey" FOREIGN KEY ("machine") REFERENCES "Machine"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PachisloPayment" ADD CONSTRAINT "PachisloPayment_rate_fkey" FOREIGN KEY ("rate") REFERENCES "Rate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PachisloPayment" ADD CONSTRAINT "PachisloPayment_shop_fkey" FOREIGN KEY ("shop") REFERENCES "Shop"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_horserace_payment_id_fkey" FOREIGN KEY ("horserace_payment_id") REFERENCES "HorseracePayment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "payments_pachioslo_payment_id_fkey" FOREIGN KEY ("pachislo_payment_id") REFERENCES "PachisloPayment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

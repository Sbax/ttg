"use client";

import { colors } from "@/colors";
import { getCharacter } from "@/generator";
import {
  brushStroke,
  getBrush,
  getRandomFromArray,
  getRandomFromObject,
} from "../utils";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";

export default function Home() {
  const [character, setCharacter] = useState();

  useEffect(() => {
    setCharacter(getCharacter());
  }, []);

  if (!character) {
    return;
  }

  const {
    name,
    race,
    characterClass,
    variant,
    skills,
    stats,
    pv,
    armor = 0,
    ki,
    spell,
    slot,
    talent,
  } = character;

  return (
    <main className={styles.main}>
      <h1 className="noprint">
        Generatore corrieri per{" "}
        <a href="https://www.needgames.it/prodotto/terror-target-gemini/">
          Terror Target Gemini
        </a>
      </h1>

      <p className="noprint">
        <b>Terror Target Gemini</b> è un prodotto di{" "}
        <a href="https://luca-negri.itch.io/terror-targe-gemini-in-breve">
          Luca Negri
        </a>
        , questo generatore è una produzione indipendente di{" "}
        <a href="https://mb.maletta.space/">Sbax</a> non affiliata al prodotto
        originale.
      </p>
      <button
        className="noprint"
        style={brushStroke(
          {
            color: "#ACE9C9",
            backgroundSize: "100% 100%",
            backgroundPosition: "center center",
          },
          getBrush()
        )}
        onClick={() => setCharacter(getCharacter())}
      >
        Dammene unə altrə!
      </button>

      <section className={styles.general}>
        <p>
          <b>Nome</b> {name}
        </p>

        <p>
          <b>Razza</b>{" "}
          <span
            style={brushStroke(
              { color: colors[race.name.toLowerCase()] },
              getBrush()
            )}
          >
            {race.name}
          </span>
        </p>

        <p>
          <b>Classe</b>{" "}
          <span
            style={brushStroke(
              { color: colors[characterClass.name.toLowerCase()] },
              getBrush()
            )}
          >
            {characterClass.name}
          </span>{" "}
          ({variant.name})
        </p>
      </section>

      <section className={styles.values}>
        <section>
          <h2>Stat</h2>
          <ul>
            <li>
              <b>
                <span className={styles.highlight}>Fis</span>ico
              </b>{" "}
              {stats.fisico}
            </li>
            <li>
              <b>
                <span className={styles.highlight}>Coo</span>rdinazione
              </b>{" "}
              {stats.coordinazione}
            </li>
            <li>
              <b>
                <span className={styles.highlight}>Int</span>elligenza
              </b>{" "}
              {stats.intelligenza}
            </li>
            <li>
              <b>
                <span className={styles.highlight}>Car</span>isma
              </b>{" "}
              {stats.carisma}
            </li>
          </ul>
        </section>

        <section>
          <h2>Skill</h2>
          <ul>
            <li>
              <b>
                <span className={styles.highlight}>all</span>enamento
              </b>{" "}
              {skills.allenamento}
            </li>
            <li>
              <b>
                <span className={styles.highlight}>man</span>ualità
              </b>{" "}
              {skills.manualità}
            </li>
            <li>
              <b>
                <span className={styles.highlight}>arc</span>ano
              </b>{" "}
              {skills.arcano}
            </li>
            <li>
              <b>
                <span className={styles.highlight}>com</span>unicare
              </b>{" "}
              {skills.comunicare}
            </li>
          </ul>
        </section>
      </section>

      <section className={styles.details}>
        <section>
          <section className={styles.box}>
            <section
              className={styles.heading}
              style={brushStroke(
                {
                  color: "black",
                  backgroundSize: `100% 7%`,
                  backgroundPosition: "center bottom",
                },
                getBrush()
              )}
            >
              <h2>Talenti</h2>
              <span>&nbsp;</span>
            </section>
            <p>
              {[race.special, characterClass.special, talent]
                .filter(Boolean)
                .join(", ")}
            </p>
          </section>

          <section className={styles.box}>
            <section
              className={styles.heading}
              style={brushStroke(
                {
                  color: "black",
                  backgroundSize: `100% 7%`,
                  backgroundPosition: "center bottom",
                },
                getBrush()
              )}
            >
              <h2>Incantesimi</h2>
              <span>
                <b>Ki</b>{" "}
                <span
                  style={{
                    display: "inline-block",
                    paddingLeft: "2em",
                  }}
                >
                  /{ki}
                </span>
              </span>
            </section>

            {spell && (
              <p>
                {spell.name} (costo {spell.cost})
              </p>
            )}
          </section>

          <section className={styles.box}>
            <section
              className={styles.heading}
              style={brushStroke(
                {
                  color: "black",
                  backgroundSize: `100% 7%`,
                  backgroundPosition: "center bottom",
                },
                getBrush()
              )}
            >
              <h2>Equipaggiamento</h2>
              <span>
                <b>Slot</b>
                <span
                  style={{
                    display: "inline-block",
                    paddingLeft: "2em",
                  }}
                >
                  /{slot}
                </span>
              </span>
            </section>
            <p>{variant.items.join(", ")}</p>
          </section>
        </section>
        <section className={styles.extra}>
          <p>
            <b>Vita</b>
            <span>{pv}</span>
          </p>
          <p>
            <b>Armatura</b>
            <span>{armor}</span>
          </p>
        </section>
      </section>
    </main>
  );
}

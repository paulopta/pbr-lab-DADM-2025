package com.pucminas.geacad.services;

import com.pucminas.geacad.config.GeacadException;
import com.pucminas.geacad.dto.AlunoRequestDTO;
import com.pucminas.geacad.dto.AlunoResponseDTO;
import com.pucminas.geacad.models.Aluno;
import com.pucminas.geacad.repositories.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AlunoService {

    @Autowired
    private final AlunoRepository alunoRepository;

    public AlunoService(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    @Transactional(readOnly = true)
    public List<AlunoResponseDTO> buscarAlunos () {
        List<Aluno> listaAlunos = alunoRepository.findAll();
    if (!listaAlunos.isEmpty()) {
        return listaAlunos.stream().map(aluno -> new AlunoResponseDTO(aluno.getNome(), aluno.getCpf(), aluno.getMatricula(), aluno.getCarteiraIdentidade(),
                aluno.getDataNascimento(),aluno.getSexo(), aluno.getNacionalidade(), aluno.getNaturalidade(), aluno.getEndereco(),
                aluno.getTelefone(), aluno.getEmail(), aluno.getCertificadoReservista())).toList();
    }
    return new ArrayList<>();
    }

    @Transactional(readOnly = true)
    public AlunoResponseDTO buscarAlunoPorId(Integer idAluno) {
        Aluno aluno = alunoRepository.findById(idAluno).orElseThrow(() -> new GeacadException("Aluno não encontrado", HttpStatus.NOT_FOUND));
        return new AlunoResponseDTO(aluno.getNome(), aluno.getCpf(), aluno.getMatricula(), aluno.getCarteiraIdentidade(),
                aluno.getDataNascimento(),aluno.getSexo(), aluno.getNacionalidade(), aluno.getNaturalidade(), aluno.getEndereco(),
                aluno.getTelefone(), aluno.getEmail(), aluno.getCertificadoReservista());
    }

    @Transactional
    public AlunoResponseDTO saveAluno(AlunoRequestDTO alunoRequestDTO) {
        Aluno aluno = new Aluno(alunoRequestDTO.getNome(), alunoRequestDTO.getCpf(), alunoRequestDTO.getMatricula(),
                alunoRequestDTO.getCarteiraIdentidade(),alunoRequestDTO.getDataNascimento(),alunoRequestDTO.getSexo(),
                alunoRequestDTO.getNacionalidade(), alunoRequestDTO.getNaturalidade(), alunoRequestDTO.getEndereco(),
                alunoRequestDTO.getTelefone(), alunoRequestDTO.getEmail(), alunoRequestDTO.getCertificadoReservista());
        Aluno alunoSalvo = alunoRepository.save(aluno);
        return new AlunoResponseDTO(alunoSalvo.getNome(), alunoSalvo.getCpf(), alunoSalvo.getMatricula(),
                alunoSalvo.getCarteiraIdentidade(),alunoSalvo.getDataNascimento(),alunoSalvo.getSexo(),
                alunoSalvo.getNacionalidade(), alunoSalvo.getNaturalidade(), alunoSalvo.getEndereco(),
                alunoSalvo.getTelefone(), alunoSalvo.getEmail(), alunoSalvo.getCertificadoReservista());
    }
    @Transactional
    public AlunoResponseDTO atualizarAluno(AlunoRequestDTO alunoRequestDTO, Integer idAluno) {
        Optional<Aluno> alunoOptional = alunoRepository.findById(idAluno);
        if (alunoOptional.isPresent()) {
            Aluno aluno = alunoOptional.get();
            aluno.setNome(alunoRequestDTO.getNome());
            aluno.setCpf(alunoRequestDTO.getCpf());
            aluno.setMatricula(alunoRequestDTO.getMatricula());
            aluno.setCarteiraIdentidade(alunoRequestDTO.getCarteiraIdentidade());
            aluno.setDataNascimento(alunoRequestDTO.getDataNascimento());
            aluno.setSexo(alunoRequestDTO.getSexo());
            aluno.setNacionalidade(alunoRequestDTO.getNacionalidade());
            aluno.setNaturalidade(alunoRequestDTO.getNaturalidade());
            aluno.setEndereco(alunoRequestDTO.getEndereco());
            aluno.setTelefone(alunoRequestDTO.getTelefone());
            aluno.setEmail(alunoRequestDTO.getEmail());
            aluno.setCertificadoReservista(alunoRequestDTO.getCertificadoReservista());
            Aluno alunoAtualizado = alunoRepository.save(aluno);
            return new AlunoResponseDTO(alunoAtualizado.getNome(), alunoAtualizado.getCpf(), alunoAtualizado.getMatricula(),
                    alunoAtualizado.getCarteiraIdentidade(),alunoAtualizado.getDataNascimento(),alunoAtualizado.getSexo(),
                    alunoAtualizado.getNacionalidade(), alunoAtualizado.getNaturalidade(), alunoAtualizado.getEndereco(),
                    alunoAtualizado.getTelefone(), alunoAtualizado.getEmail(), alunoAtualizado.getCertificadoReservista());
        }
        return null;
    }
    @Transactional
    public AlunoResponseDTO deleteAluno(Integer idAluno) {
        Aluno aluno = alunoRepository.findById(idAluno).orElseThrow(() -> new GeacadException("Aluno não encontrado", HttpStatus.NOT_FOUND));
        alunoRepository.deleteById(idAluno);
        return new AlunoResponseDTO(aluno.getNome(), aluno.getCpf(), aluno.getMatricula(),
                aluno.getCarteiraIdentidade(),aluno.getDataNascimento(),aluno.getSexo(),
                aluno.getNacionalidade(), aluno.getNaturalidade(), aluno.getEndereco(),
                aluno.getTelefone(), aluno.getEmail(), aluno.getCertificadoReservista());
    }



}
